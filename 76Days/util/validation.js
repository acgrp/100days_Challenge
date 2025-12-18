function postIsValid(title, content) {
    enteredTitle ||
    enteredContent ||
    enteredTitle.trim() !== '' &&
    enteredContent.trim() !== ''
      
}
module.exports = {
    postIsValid: postIsValid
}