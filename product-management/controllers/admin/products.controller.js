const Products = require("../../model/products.model");
const filterButtonHelper = require("../../helpers/filterButton");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const search = require("../../helpers/search");
const systemConfig = require("../../config/systems");
//[GET] /admin/product
module.exports.products = async (req, res) => {
  const filterButton = filterButtonHelper(req.query);

  const find = {
    deleted: false,
  };

  //search
  const objectSearch = searchHelper(req.query);
  if (req.query.keyword) {
    find.title = objectSearch.regex;
  }

  //filter
  if (req.query.status) {
    find.status = req.query.status;
  }

  //pagination
  const countProduct = await Products.countDocuments(find);
  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limit: 4,
    },
    req.query,
    countProduct
  );

  //sort
  const sort = {};
  if(req.query.sortkey&&req.query.sortvalue)
  {
    sort[req.query.sortkey] = req.query.sortvalue;
  }
  sort.position = "desc";

  

  const products = await Products.find(find)
    .limit(objectPagination.limit)
    .skip(objectPagination.skip)
    .sort(sort);
  res.render("admin/pages/products/index.pug", {
    pageTitle: "Trang sản phẩm",
    products: products,
    filterButton: filterButton,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};

//[GET] /admin/product/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await Products.updateOne({ _id: id }, { status: status });
  req.flash("success", "Cập nhật trạng thái sản phẩm thành công !");
  res.redirect("back");
};

//[GET] /admin/product/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  switch (type) {
    case "active":
      await Products.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash(
        "success",
        `Cập nhật trạng ${ids.length} thái sản phẩm thành công !`
      );
      break;
    case "inactive":
      await Products.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash(
        "success",
        `Cập nhật trạng ${ids.length} thái sản phẩm thành công !`
      );
      break;
    case "delete-all":
      await Products.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deletedAt: new Date() }
      );
      req.flash("success", `Xoá ${ids.length} sản phẩm thành công !`);
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        console.log(position);
        await Products.updateOne({ _id: id }, { position: position });
      }
      break;
    default:
      break;
  }
  res.redirect("back");
};

//[GET] /admin/product/delete
module.exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  //delete cứng
  // await Products.deleteOne(
  //   {_id:id},
  // );

  //delete mềm
  await Products.updateOne(
    { _id: id },
    {
      deleted: true,
      deletedAt: new Date(),
    }
  );
  req.flash("success", `Xoá sản phẩm thành công !`);
  res.redirect("back");
};

//[GET] /admin/product/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/products/create", {
    pageTitle: "Thêm mới sản phẩm",
  });
};

//[POST] /admin/product/create
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if (req.body.position == "") {
    const countProduct = await Products.countDocuments();
    req.body.position = countProduct + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  // if (req.file) {
  //   req.body.thumbnail = `/uploads/${req.file.filename}`;
  // }
  const product = new Products(req.body);
  await product.save();
  res.redirect(`${systemConfig.prefixAdmin}/products`);
};

//[GET] /admin/product/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };
    const product = await Products.findOne(find);
    res.render("admin/pages/products/edit", {
      pageTitle: "Cập nhật sản phẩm",
      product: product,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};

//[PATCH] /admin/product/edit/:id
module.exports.editPatch = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);

  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }
  try {
    const id = req.params.id;
    await Products.updateOne({ _id: id }, req.body);
    req.flash("success", `Cập nhật thành công !`);
  } catch (error) {
    req.flash("success", `Cập nhật không thành công !`);
  }
  res.redirect("back");
};

//[GET] /admin/product/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };
    const product = await Products.findOne(find);
    res.render("admin/pages/products/detail", {
      pageTitle: product.title,
      product: product,
    });
  } catch {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};
