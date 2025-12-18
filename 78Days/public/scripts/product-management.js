const deleteProductButtonElement = document.querySelectorAll('.product-item button');

async function deleteProduct(event) {
    const buttonElement = event.target;
    const productId = buttonElement.dataset.productid;
    const csrfToken = buttonElement.dataset.csrf;

    const response = await fetch('/admin/products/' + productId + '?_csrf=' + csrfToken, {//다른 도메인에 보낼경우 전부 작성, 같은곳은 생략가능
        method: 'DELETE'
    });

    if (!response.ok) {
        alert('Songthing went wrong!');
        return;
    }

    buttonElement.parentElement.parentElement.parentElement.parentElement.remove();
}

for (const deleteProductButtonElements of deleteProductButtonElement) {
    deleteProductButtonElements.addEventListener('click', deleteProduct);
}