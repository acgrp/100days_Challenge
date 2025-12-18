// First Example: Sum numbers

const sumBotton = document.querySelector('#calculator button');//더 구체적인 선택 가능(앞에 다른 버튼이 생겨도 선택 유지)

function calculateSum() {
    const userNumberElement = document.getElementById('user-number'); // 2. userNumberElement에 user-number라는 id에서 요소 가져와서 넣기
    const enteredNumber = userNumberElement.value;                   // 3.userNumberElement의 값을 enteredNumber에 넣기

    let sumUpToNumber = 0;                                          //4. sumUpToNumber를 생성

    for (let i  = 0; i <= enteredNumber; i++) {                //5. 반복문 실행(enteredNumber이 문자열이지만 자동으로 변환됨)
        sumUpToNumber += i;                                   //6. sumUpToNumber에 i를 계속 더함
    }

    const outputResultElement = document.getElementById('calculated-sum');  //7. outputResultElement에 calculated-sum라는 id에서 요소를 가져옴

    outputResultElement.textContent = sumUpToNumber;    //8. 더한 수를 텍스트만 변경
    outputResultElement.style.display = 'block';        //9. JS에서 CSS에 calculated-sum라는 속성에서 display를 보이게함
}

sumBotton.addEventListener('click', calculateSum);  // 1. sumBotton클릭시 CalculateSum 실행
 

//HighLight links

const highlightBTN = document.querySelector('#highlight-links button');

function highlightLinks() {
    const anchorElements = document.querySelectorAll('#highlight-links a');

    for (const anchorElement of anchorElements) {
        anchorElement.classList.add('highlight');
    }
}

highlightBTN.addEventListener('click', highlightLinks);

// Displat user data

const dummyUserData = {
    firstName: 'Jin',
    lastName: 'seo',
    age: 26
};

const displayUserDB = document.querySelector('#user-data button');

function displayUserD() {
    const outputDataElement = document.getElementById('output-user-data');

    outputDataElement.innerHTML = '';

    for (const key in dummyUserData) {
        const newUserD = document.createElement('li');
        const outputText = key.toUpperCase() + ': ' + dummyUserData[key];
        newUserD.textContent = outputText;
        outputDataElement.append(newUserD);
    }
}

displayUserDB.addEventListener('click', displayUserD)

// Statistics / Roll the Dice

const rollDiceButtonElement = document.querySelector('#statistics button');

function rollDice () {
    return Math.floor(Math.random() * 6 + 1); // 1~6숫자를 무작위로 출력 (Math.floor은 소숫점 버림)
}

function DiceofRoll() {
    const targetNumberInputElement = document.getElementById('user-target-number');
    const diceRollsListElement = document.getElementById('dice-rolls');

    const enteredNumber = targetNumberInputElement.value; //targetNumberInputElement의 값을 enteredNUmber에 기록
    diceRollsListElement.innerHTML = '';       //다음번 시작될시, 이전 기록 삭제

    let hasRTN = false; //계속 굴리는 조건
    let numberOR = 0;  //주사위 횟수

    while (!hasRTN) {   //hasRTN의 false라는 뜻, 즉 true
        const rolledNum = rollDice(); //rollDice의 값을 rolledNum에 추가

        numberOR++;    //rollDiceButtonElement버튼을 누르고 횟수만큼 숫자 증가
        const newRLE = document.createElement('li');  //newRLE라는 곳에[ li을 만들어 주사위 횟수와 결과를 저장하려는 계획]
        const outputText = 'Roll ' + numberOR + ': ' + rolledNum; //결과마다 값을 붙임
        newRLE.textContent = outputText;  // 위에서 붙인 값을 text로 출력
        diceRollsListElement.append(newRLE);  // ul속에 li에 결과를 과정과 함께 집어넣음
        hasRTN = rolledNum == enteredNumber; // 원하는 값과 굴리는 값이 일치하면 정지
    }

    const outputTRE = document.getElementById('output-total-rolls'); // 몇번했는지 입력
    const outputTNE = document.getElementById('output-target-number'); // 원하는 숫자가 뭐였는지 입력

    outputTNE.textContent = enteredNumber; //몇번했는지 출력
    outputTRE.textContent = numberOR; // 원하는 숫자 출력
}

rollDiceButtonElement.addEventListener('click', DiceofRoll); //rollDiceButtonElement클릭시 DiceofRoll시작