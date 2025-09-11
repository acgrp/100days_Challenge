function resetGameStatus() {  //게임을 다시 시작할때 사용
    activePlayer = 0;  // 현재 사용하고 있는 플레이어를 의미
    currentRound = 1;  // 현재 진행되고 있는 라운드를 의미
    gameIsOver = false;  // 미리 지정해둔걸 true, false만 바꿈(게임 끝을 알림)
    gameOverElement.firstElementChild.innerHTML = 'You won, <span id="winner-name">PLAYER NAME</span>!';  // id = game-over에 첫 자식의 내용을 이것으로 text수정
    gameOverElement.style.display = 'none';  // 위에서 한게 아직 등장할 타이밍이 아니므로 display

    let gameboardIndex = 0;  // gameboardIndex를 선언
    for (let i = 0; i < 3; i++) {  // for 반복 3번
        for(let j = 0; j < 3; j++) { //for반복 3번을 3번 = 총 9번 
            gameData[i][j] = 0;  // 모든 곳들을 0으로 지정(플레이어가 선택했던 1, 2를 지우는 역할)
            const gameBoardItemElement = gameboardElements.children[gameboardIndex];  // id=game-board에 li들을 전부 index를 부여
            gameBoardItemElement.textContent = '';  // 이전에 표시된 X, O를 지움(보드판 초기화)
            gameBoardItemElement.classList.remove('disabled'); // 게임보드에 클릭못하게 설정한 disabled를 제거
            gameboardIndex++;  // 모든 칸을 돌기위해 index값을 1키움
        }
    }

}

function startNewGame() {  // 새로운 게임 시작 함수
    if (players[0].name ===  '' || players[1].name === '') { // 플레이어의 이름이 빈칸일 경우
        alert('이름을 적으세요'); //  경고('이름을 적으세요')라고 알림메세지
        return;  // 출력
    }

    resetGameStatus();  // 새로시작인지 다시시작인지 모르기 때문에 오류를 방지하고자 이곳에 배치

    activeplayerNameElement.textContent = players[activePlayer].name;  // 현재 진행중인 플레이어(1, 2)에 해당하는 이름을 active-player-name에 입력
    gameAreaElement.style.display = 'block';  // 게임시작하고 나서는 보이는 타이밍, 따라서 active-game부분을 보이게 css를 변경
    
}

function switchPlayer() {  // 차례 바꾸기 함수
    if (activePlayer === 0) { // 0이라면 
        activePlayer = 1;  // 1로 바꾸기
    } else {  //그 외에는
        activePlayer = 0; // 0으로 바꾸기
    }
    activeplayerNameElement.textContent = players[activePlayer].name; // 현재 차례인 플레이어를 active-player-name에 입력

}

function selectGameField(event) { //event는 함수가 클릭되어 실행시 자동으로 알려주는 객체, li를 눌럿을때 그에 해당하는 정보를 가져옴
    if(event.target.tagName !== 'LI' || gameIsOver){  //LI말고 다른걸 클릭시 무시 || gameIsOver가 true일때
        return; // 출력
    }

    const selectedField = event.target;  //selectedField를 event.target로 지정
    const selectedColumn = selectedField.dataset.col -1; // selectedColumn을 selectedField의 dataset.col로 지정, 문자열이므로 -1로 숫자로 만들고 
    const selectedRow = selectedField.dataset.row -1; // selectedRow을 selectedField의 dataset.row로 지정, 문자열이므로 -1로 숫자로 만들고 

    if(gameData[selectedRow][selectedColumn] > 0){  //해당 칸이 플레이어로 인해 값이 0보다 켜졌을 경우 작동
        alert('비어있는 칸을 선택하세요');  // 알림메세지 출력
        return; //해당 절을 빠져나감
    }

    selectedField.textContent = players[activePlayer].symbol; // 플레이어의 symbol로 selectedField를 채움
    selectedField.classList.add('disabled'); // 게임보드에 disabled를 추가함으로 추가적인 클릭이 불가능하게 변경

    gameData[selectedRow][selectedColumn] = activePlayer + 1;  // 플레이어가 배열상 0, 1이니까 +1해서 gameData에 저장
    console.log(gameData); //gameData의 로그를 남김

    const winnerId = checkForGameOver(); //checkForGameOver에서 구분화 해서 온 승자를 winnerId에 저장

    if (winnerId !== 0) {  //승자가 정해지면 실행
        endGame(winnerId); //endGame을 출력
    }

    currentRound++; //라운드 수 증가
    switchPlayer(); //플레이어 턴 전환
}

function checkForGameOver() { //승자를 구분하기 위한 조건들 
    for (let i = 0; i <= 2; i++) {
        if (gameData[i][0] > 0 && 
        gameData[i][0] === gameData[i][1] && 
        gameData[i][0] === gameData[i][2]) {
        return gameData[i][0];
    }
    }
    for (let i = 0; i <= 2; i++) {
        if (gameData[0][i] > 0 && 
        gameData[0][i] === gameData[1][i] && 
        gameData[0][i] === gameData[2][i]) {
        return gameData[0][i];
    }
    }
    for(let i = 0; i <= 2; i++){
        if (gameData[0][0] > 0 && 
        gameData[0][0] === gameData[1][1] && 
        gameData[1][1] === gameData[2][2]) {
        return gameData[0][0];
    }
    
        if (gameData[2][0] > 0 && 
        gameData[2][0] === gameData[1][1] && 
        gameData[1][1] === gameData[0][2]) {
        return gameData[2][0];
    }
    }
    if(currentRound == 9) {  //만약 위 조건을 만족하지않고 스테이지가 9가 되었을경우 출력
        return -1; //-1을 반환
    }
    return 0; //그렇지않을때 0 반환
}
function endGame(winnerId) { //게임이 끝났을때 실행
    gameIsOver = true; //gameIsOver을 true로 변경
    gameOverElement.style.display = 'block'; //id=game-over을 보이도록 css를 변경해 출력

    if(winnerId > 0) { //1과 2가 플레이어이고 그 숫자가 뜬거면 실행
        const winnerName = players[winnerId - 1].name;//이긴 플레이어 이름을 winnerName에 저장
        gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;//id=game-over에 첫자식에 첫자식의 텍스트를 winnerName로 바꿈
    } else {
        gameOverElement.firstElementChild.textContent = 'It\'s a draw!' //그외에는 비긴것으로 출력
    }

}

