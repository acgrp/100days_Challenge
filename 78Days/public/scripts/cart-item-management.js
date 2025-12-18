const cartItemUpdateFormElements = document.querySelectorAll(".cart-item-management");
const cartTotalPriceElement = document.getElementById("cart-total-price");
const cartBadge = document.querySelector('.nav-items .badge');


async function updateCartItem(event) {
  event.preventDefault();

  const form = event.target;

  const productId = form.dataset.productid;
  const csrfToken = form.dataset.csrf;
  const quantity = form.firstElementChild.value;

  let response;
  try {
    response = await fetch("/cart/items", {
      method: "PATCH",
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("뭔가 잘못되었습니다");
    return;
  }

  if (!response.ok) {
    alert('뭔가 잘못된거같다뇨');
    return;
  }

  const responseData = await response.json();

  if (responseData.updatedCartData.updatedItemPrice === 0) {
    form.parentElement.parentElement.remove();
  } else {
    const cartItemPriceElement = form.parentElement.querySelector('.cart-item-price');
    cartItemPriceElement.textContent = responseData.updatedCartData.updatedItemPrice.toFixed(2);
  }
  
  cartTotalPriceElement.textContent = responseData.updatedCartData.newTotalPrice.toFixed(2);

  cartBadge.textContent = responseData.updatedCartData.newTotalQuantity;
}

for (const formElement of cartItemUpdateFormElements) {
  formElement.addEventListener("submit", updateCartItem);
}