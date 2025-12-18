const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, '..', 'data', 'restaurants.json'); //'..'은 상위 다이렉토리로 이동하고 싶다고 하는 코드
    
function getStoredRestaurants() {  
      const fileData = fs.readFileSync(filePath); //json파일 내용을 문자열로 읽어옴
      const storedRestaurants = JSON.parse(fileData); //문자열을 자바스크립트 배열로 변환

      return storedRestaurants;
}

function storedRestaurants(storableRestaurants) {
    fs.writeFileSync(filePath, JSON.stringify(storableRestaurants)); // 업데이트된 배열을 다시 문자열로 바꿔 JSON 파일에 저장
}

module.exports = {  // 이렇게 내보내는 코드로 이름을 지정해서 내보내 줘야 사용 가능
    getStoredRestaurants: getStoredRestaurants,
    storedRestaurants: storedRestaurants
};