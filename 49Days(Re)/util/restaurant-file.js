const filePath = path.join(__dirname, 'data', 'restaurants.json');

function getStoredRestaurants() {
      const filePath = path.join(__dirname, "data", "restaurants.json"); // JSON파일의 경로를 filePath에 저장
    
      const fileData = fs.readFileSync(filePath); //json파일 내용을 문자열로 읽어옴
      const storedRestaurants = JSON.parse(fileData); //문자열을 자바스크립트 배열로 변환

      return storedRestaurants;
}

function storedRestaurants(storableRestaurants) {
    fs.writeFileSync(filePath, JSON.stringify(storableRestaurants)); // 업데이트된 배열을 다시 문자열로 바꿔 JSON 파일에 저장
}