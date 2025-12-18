function openPlayerConfig(event) {
    editedPlayer = +event.target.dataset.playerid; //event.target은 이벤트가 발생한 html요소를 말함, dataset는 data로 시작하는 html을 모아둔것 , html에 data-playerid="1",data-playerid="2"가 있으니 각각 1, 2가 됨
    playerConfigOverlayElement.style.display = 'block'; //edit 버튼을 눌럿을때 보이게 만듬
    backdropElement.style.display = 'block';  //edit 버튼을 눌럿을때 보이게 만듬
}

function closePlayerConfig() { //closePlayerConfig를 작동 (backdropElement, cancelConfigBtnElement이것을 누르면)
    playerConfigOverlayElement.style.display = 'none'; //playerConfigOverlayElement가 안보임
    backdropElement.style.display = 'none'; //backdropElement가 안보임
    formElement.firstElementChild.classList.remove('error'); //form의 첫번째 자식의 class에서 error를 지움(error를 추가했다가 지우는 것)
    errorsOutputElement.textContent = '';  //config-errors를 ''로 수정 (아마도 'Please enter a valid name!'였을듯)
    formElement.firstElementChild.lastElementChild.value = ''; //form의 첫번째, 마지막 자식을 찾아서 값을 ''로 바꿈
}

function savePlayerConfig(event) {
    event.preventDefault();  // 양식 제출하는것을 막음(기본값으로 하면 새로고침이 되기때문에)
    const formData = new FormData(event.target);  //FormData는 기존 단어로 form에서 html으로 데이터를 뽑아옴
    const enteredplayerName = formData.get('playername').trim(); //playername을 적을때 양끝 빈칸 삭제
    
    if (!enteredplayerName) {//빈칸으로 이름 제출시 라는 뜻
        event.target.firstElementChild.classList.add('error'); // (이전에 사용한 event.target)form에 첫번째 자식에 error라는 class를 추가
        errorsOutputElement.textContent = 'Please enter a valid name!'; //errorsOutputElement에 지정된 곳에  Please enter a valid name!라고 텍스트 띄움
        return;
    }

    const updatedPlayerDataElement = document.getElementById('player-' + editedPlayer + '-data');
    updatedPlayerDataElement.children[1].textContent = enteredplayerName; //적힌 이름을 text로 각 id에 2번째 자식에게 적용

    players[editedPlayer - 1].name = enteredplayerName; //변수 players에 이름 입력

    closePlayerConfig();
}