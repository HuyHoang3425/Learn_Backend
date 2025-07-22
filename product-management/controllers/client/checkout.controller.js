const Cart = require("../../model/cart.model");
const Order = require("../../model/order.model");
const Products = require("../../model/products.model");

//[GET] /checkout
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;
  const cart = await Cart.findOne({
    _id: cartId,
  });

  if (cart.products.length > 0) {
    for (const item of cart.products) {
      const product = await Products.findOne({ _id: item.product_id });
      item.productInfo = product;
      item.newPrice = Math.ceil(
        item.productInfo.price -
          item.productInfo.price * (item.productInfo.discountPercentage / 100)
      );
      item.totalProduct = item.quantity * item.newPrice;
    }
    cart.total = cart.products.reduce(
      (sum, item) => item.totalProduct + sum,
      0
    );
  }
  res.render("client/pages/checkout/index", {
    pageTitle: "Thanh toán",
    cart: cart,
  });
};

//[POST /checkout/order
module.exports.order = async (req, res) => {
  const cartId = req.cookies.cartId;
  const cart = await Cart.findOne({
    _id: cartId,
  });
  const userInfo = req.body;
  console.log(userInfo)
  const products = [];
  for (const product of cart.products) {
    const objectProduct = {
      product_id: product.product_id,
      quantity: product.quantity,
      price: 0,
      discountPercentage: 0,
    };
    const productInfo = await Products.findOne({
      _id: product.product_id,
    });
    objectProduct.price = productInfo.price;
    objectProduct.discountPercentage = productInfo.discountPercentage;

    products.push(objectProduct);
  }
  const objectOrder = {
    cart_id: cartId,
    userInfo: userInfo,
    products: products,
  };

  const order = new Order(objectOrder);
  await order.save();
  await Cart.updateOne(
    {
      _id: cartId,
    },
    {
      products: [],
    }
  );

  res.redirect(`order/${order.id}`);
};


//[GET] /checkout/order/:id
module.exports.success = async (req, res) => {
  const id = req.params.id;
  const order = await Order.findOne({
    _id:id,
  });
  for(const item of order.products){
    const product = await Products.findOne({
      _id:item.product_id,
    });
    item.productInfo = product;
    item.newPrice = Math.ceil(
      item.productInfo.price -
        item.productInfo.price * (item.productInfo.discountPercentage / 100)
    );
    item.totalProduct = item.quantity * item.newPrice;
  };
  order.total = order.products.reduce((sum, item) => item.totalProduct + sum, 0);
  res.render("client/pages/checkout/success", {
    pageTitle: "Đặt hàng thành công",
    order:order,
  });
};
