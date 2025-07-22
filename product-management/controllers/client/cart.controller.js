const Cart = require("../../model/cart.model");
const Products = require("../../model/products.model");

// [GET] /cart
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
  res.render("client/pages/cart/index", {
    pageTitle: "Giỏ hàng",
    cart: cart,
  });
};

// [POST] /cart/add/:productId
module.exports.add = async (req, res) => {
  const productId = req.params.productId;
  const cartId = req.cookies.cartId;
  const quantity = parseInt(req.body.quantity);

  const product = {
    product_id: productId,
    quantity: quantity,
  };

  const cart = await Cart.findOne({ _id: cartId });
  const isProductInCart = cart.products.find(
    (item) => item.product_id == productId
  );
  if (isProductInCart) {
    const newQuantity = isProductInCart.quantity + quantity;
    await Cart.updateOne(
      {
        _id: cartId,
        "products.product_id": isProductInCart.product_id,
      },
      {
        "products.$.quantity": newQuantity,
      }
    );
  } else {
    await Cart.updateOne(
      {
        _id: cartId,
      },
      {
        $push: { products: product },
      }
    );
  }

  req.flash("success", "Thêm sản phẩm vào giỏ hàng thành công !");

  res.redirect("back");
};

// [GET] /cart/delete/:productId
module.exports.delete = async (req, res) => {
  const cartId = req.cookies.cartId;
  const productId = req.params.productId;
  const cart = await Cart.findOne({
    _id: cartId,
  });
  await Cart.updateOne(
    { _id: cartId },
    { $pull: { products: { product_id: productId } } }
  );
  res.redirect("back");
};

// [GET] /cart/delete/:productId
module.exports.update = async (req, res) => {
  const cartId = req.cookies.cartId;
  const productId = req.params.productId;
  const quantity = req.params.quantity;
  const cart = await Cart.findOne({
    _id: cartId,
  });
  await Cart.updateOne(
    {
      _id: cartId,
      "products.product_id": productId,
    },
    {
      "products.$.quantity": quantity,
    }
  );
  for (const item of cart.products) {
    const product = await Products.findOne({ _id: item.product_id });
    item.productInfo = product;
    item.newPrice = Math.ceil(
      item.productInfo.price -
        item.productInfo.price * (item.productInfo.discountPercentage / 100)
    );
    item.totalProduct = item.quantity * item.newPrice;
  }
  cart.total = cart.products.reduce((sum, item) => item.totalProduct + sum, 0);
  req.flash("success", "Cập nhật giỏ hàng thành công !");
  res.redirect("back");
};
