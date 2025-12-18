let productNameInputElement = document.getElementById('product-name');
let remainingCharsElement = document.getElementById('remaining-chars');

let maxAllowedChars = productNameInputElement.maxLength;


function updateRemainingCharacters() {
    let enteredText = event.target.value;
    let enteredTextLength = enteredText.length;

    let remainingCharacters = maxAllowedChars- enteredTextLength
    
    remainingCharsElement.textContent = remainingCharacters;

    if (remainingCharacters == 0) {
        remainingCharsElement.classList.add('error');
        productNameInputElement.classList.add('error');
    } else if (remainingCharacters <= 10) {
        remainingCharsElement.classList.remove('error');
        productNameInputElement.classList.remove('error');
        remainingCharsElement.classList.add('warning');
        productNameInputElement.classList.add('warning'); 
    }else{
        remainingCharsElement.classList.remove('warning');
        productNameInputElement.classList.remove('warning');
    }
}

productNameInputElement.addEventListener('input', updateRemainingCharacters);