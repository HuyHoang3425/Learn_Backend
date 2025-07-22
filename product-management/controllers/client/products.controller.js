const Products = require("../../model/products.model");
const ProductsCategory = require("../../model/products-category.model");
const ProductsCategoryHelper = require('../../helpers/product-category');

module.exports.index = async (req, res) => {
  const products = await Products.find({
    status:"active",
    deleted:false
  }).sort({ position: "desc" });
  res.render("client/pages/products/index.pug",{
    pageTitle: "Danh sách sản phẩm",
    products:products
  })
}
//[GET] /products/:id
module.exports.detail = async (req, res) => {
  const {id} = req.params;
    const find = {
      deleted: false, 
      _id:id,
    };
    const product = await Products.findOne(find);
    res.render("client/pages/products/detail", {
      pageTitle: product.slug,
      product: product,
    });
};

//[GET] /products/category/:slug
module.exports.category = async (req,res) =>{
  const {slug} = req.params;
  const category = await ProductsCategory.findOne({
    slug:slug,
  });
  
  const listSub = await ProductsCategoryHelper.getSubCategory(category.id);
  const listSubId = listSub.map(item => item.id);

  const products = await Products.find({
    category_id: { $in: [category.id,...listSubId] },
    deleted: false,
  });

  res.render("client/pages/products", {
    pageTitle:slug,
    products: products,
  });
};  