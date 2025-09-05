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
