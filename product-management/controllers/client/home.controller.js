const ProductsCategory = require("../../model/products-category.model");
const systemConfig = require("../../config/systems");
const createTreeHelper = require("../../helpers/createTree");
const Product = require('../../model/products.model');
//[GET] /products-category
module.exports.index = async (req, res) => {
  products = await Product.find({
    featured:"1",
    deleted:false,
    status:"active",
  })
  res.render("client/pages/home/index.pug", {
    pageTitle: "Trang chủ",
    products:products,
  });
}