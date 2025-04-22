const Products = require("../../model/products.model")

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
//[GET] /products/:slug
module.exports.detail = async (req, res) => {
  const {slug} = req.params;
  try {
    const find = {
      deleted: false,
      slug: slug,
    };
    const product = await Products.findOne(find);
    console.log(product);
    res.render("client/pages/products/detail", {
      pageTitle: product.slug,
      product: product,
    });
  } catch {
    res.redirect(`/products`);
  }
};
