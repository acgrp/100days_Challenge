let paragrphElement = document.querySelector('p');

function changeParagraphText(event) {
    paragrphElement.textContent  = 'Clicked!';
    console.log('paragraph clicked');
    console.log(event);
}

paragrphElement.addEventListener('click', changeParagraphText);

let inputElement = document.querySelector('input');

function retrieveUserInput (event) {
    // let enteredText = event.data;
    // let enteredText = event.target.value;
    console.log(enteredText);
    console.log(event);
}

inputElement.addEventListener('input', retrieveUserInput);