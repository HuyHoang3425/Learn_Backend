//cập nhật số lượng giỏ hàng
const inputs = document.querySelectorAll("input[name = 'quantity']");

if(inputs){
  inputs.forEach(item =>{
    item.addEventListener("change",(e) =>{
      const quantity = parseInt(item.value);
      const productId = item.getAttribute("product_id");
      console.log(productId);
      if(quantity > 0){
        window.location.href = `/cart/update/${productId}/${quantity}`;
      }
    });
  });
}
//cập nhật số lượng giỏ hàng