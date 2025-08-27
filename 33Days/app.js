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