// Practice what you learned!

// 1) Select the two <button> elements and store them in two different variables.
//    - Select the first button without adding or using any "id"
//    - Select the second button by using an "id"

const firstButtonElment = document.querySelector('button');//querySelector가 첫번째 매칭되는 것을 찾음
const secondButtonElement = document.getElementById('second-btn'); //id를 찾을땐 getElementById사용, querySelector도 가능 (단, get은 #없이사용/query는 #사용)


// 2) Add "click" event listener to both buttons (with two different functions).
//    The functions should "console.dir()" the clicked buttons.
//    - Output the first button by using the variable in which it's stored
//    - Output the second button WITHOUT using the variable in which it's stored


// function removeParagraph() {
//     console.dir(firstButtonElment)
// }

// function changeBackgroundColor(event) { //?
//     console.dir(event.target);
// }

// firstButtonElment.addEventListener('click', removeParagraph);
// secondButtonElement.addEventListener('click', changeBackgroundColor);


// 3) Now select and store the paragraphs mentioned in the text you see on the page
//    (first and third paragraph)
//    - Select BOTH paragraphs by drilling into the document and "navigating" to the
//      mentioned elements
//    - If you struggle with DOM drilling, use "ids" instead but watch the solution!


const firstParagraphElement = document.body.children[2].children[1];
console.log(firstParagraphElement);// 확인하는 코드, log대신 dir도 가능
const thirdParagraphElement = document.body.children[2].children[3];
console.log(thirdParagraphElement);
const fourthParagraphElement = firstParagraphElement.nextElementSibling.nextElementSibling; //third와 같은 의미, 첫번째꺼의 다다음 것을 고르는 것
console.log(fourthParagraphElement);


// 4) Change the functions from (2) such that:
//    - The first button removes the third paragraph (i.e. the <p> prior to it)
//    - The second button changes the background color of the first paragraph to blue


function removeParagraph() {
    thirdParagraphElement.remove(); //문장 삭제
}

function changeBackgroundColor(event) { //?
    // firstParagraphElement.style.backgroundColor = 'gray'; //firstParagraphElement의 배경을 변경
    // firstParagraphElement.className = 'blue-bg'; //CSS에 있는 style을 java에서 지정한 타이밍에 사용(단, 이건 추가가아닌 교체이기때문에 기존것이 사라짐)
    firstParagraphElement.classList.add('blue-bg'); //CSS에 있는 style을 java에서 지정한 타이밍에 사용(이것을 추가)

}

firstButtonElment.addEventListener('click', removeParagraph);
secondButtonElement.addEventListener('click', changeBackgroundColor);


// 5) Solve (4) both by changing the "inline styles" as well as by adding CSS classes
//    Note: You'll have to add those classes to the styles.css file first!

