function getSessionErrorDate(req, defaultValues) {
    let sessionInputData = req.session.inputData; 

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      ...defaultValues
    };
  }

  req.session.inputData = null;

  return sessionInputData;
}

function falshErrorsToSession(req, data, action) {
    req.session.inputData = {
      hasError: true,
      ...data//...은 스프레드 연산자, 해당 객체의 모든 키 값 쌍과 모든속성을 가져와 키값쌍을 추가 
    };

    req.session.save(action);
}

module.exports = {
    getSessionErrorDate: getSessionErrorDate,
    falshErrorsToSession: falshErrorsToSession
};