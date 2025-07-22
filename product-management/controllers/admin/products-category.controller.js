const ProductsCategory = require("../../model/products-category.model");
const systemConfig = require("../../config/systems");
const createTreeHelper = require("../../helpers/createTree");
//[GET] /products-category
module.exports.category = async (req, res) => {
  find = {
    deleted: false,
  };
  const records = await ProductsCategory.find(find);
  const tree = createTreeHelper.tree(records);
  res.render("admin/pages/products-category/index", {
    pageTitle: "Danh mục sản phẩm",
    records: tree,
  });
};

//[GET] /products-category/create
module.exports.create = async (req, res) => {
  const find = {
    deleted: false,
  };
  const records = await ProductsCategory.find(find);
  const tree = createTreeHelper.tree(records);
  res.render("admin/pages/products-category/create", {
    pageTitle: "Thêm danh mục sản phẩm",
    records: tree,
  });
};

//[POST] /products-category/create
module.exports.createPost = async (req, res) => {
  const permission = res.locals.role.permissions;

  if (permission.includes("create_product")) {
    console.log("có quyền");
    if (req.body.position == "") {
      const count = await ProductsCategory.countDocuments();
      req.body.position = count + 1;
    } else {
      req.body.position = parseInt(req.body.position);
    }
    const category = new ProductsCategory(req.body);
    await category.save();
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  } else {
    console.log("không quyền");
    return;
  }
};
//[GET] /products-category/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const find = {
      _id: id,
      deleted: false,
    };
    const records = await ProductsCategory.find({
      deleted: false,
    });
    const tree = createTreeHelper.tree(records);
    const data = await ProductsCategory.findOne(find);
    res.render("admin/pages/products-category/edit", {
      pageTitle: "Sửa danh mục",
      category: data,
      records: tree,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  }
};
//[PATCH] /products-category/edit/:id
module.exports.editPost = async (req, res) => {
  try {
    const id = req.params.id;
    await ProductsCategory.updateOne({ _id: id }, req.body);
    req.flash("success", `Cập nhật thành công !`);
  } catch (error) {
    req.flash("success", `Cập nhật không thành công !`);
  }
  res.redirect("back");
};
