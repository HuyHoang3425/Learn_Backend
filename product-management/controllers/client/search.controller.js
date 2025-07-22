const Products = require('../../model/products.model');


module.exports.index = async (req,res) =>{
  const keyword = req.query.keyword;
  let productList = [];
  if(keyword){
    const keywordRegex = new RegExp(keyword,"i");

    const products = await Products.find({
      title: keywordRegex,
      status: "active",
      deleted: false,
    });
    productList = products
  }
  res.render("client/pages/search/index.pug", {
    pageTitle: "kết quả tìm kiếm",
    keyword: keyword,
    products: productList,
  });
}