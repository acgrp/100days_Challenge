// document.body.children[1].children[0].href = 'http://google.com';

//  comsole.dir(document);
// alert();
// window.alert();

let anchorElement = document.getElementById('external-link');
anchorElement.href = 'http://google.com';

anchorElement = document.querySelector('p a');//All : 모든, 없으면 p a의 첫번째에
anchorElement.href = 'http://academind.com';


let newAnchorElement = document.createElement('a');
newAnchorElement.href = 'http://google.com';
newAnchorElement.textContent = 'This leads to Google!';

let firstParagraph = document.querySelector('p');

firstParagraph.append(newAnchorElement);

let firstH1Element = document.querySelector('h1'); //첫번째 h1 찾기

firstH1Element.remove(); //첫번째 h1 삭제(요즘꺼만 사용 가능)
// firstH1Element.parentElement.removeChild(firstH1Element);  //옛 브라우저 용

firstParagraph.parentElement.append(firstParagraph); //위치이동 (이동할 부모에 append, insert를 사용해서 이동)

console.log(firstParagraph.innerHTML); //textContent와는 다르게 해당위치에 있는것 전부 대상

firstParagraph.innerHTML = 'Hi! This is <strong>importtant!</strong>.';// textContent 사용시 text로만 입력됨

