//UI -> backend UI -> abstraction (not to DOM)
//Render Quiz in Console?
//Canvas API in HTML?
//Tests - helps or not?
//React -> React Native - using same parts? Paint app? Pixel based? Saving
const UIBackend = require('./ui-backend');


function UI(renderer) {

  function render(next, back, Question, userAnswer) {

    UIBackend(renderer).clear();
    UIBackend(renderer).addContainer([
      UIBackend(renderer).createText(Question.getQuestion()),
      ...Question.getAnswers().map(answer => UIBackend(renderer).createChoice(answer, userAnswer)),
      UIBackend(renderer).createButton('Previous question', back),
      UIBackend(renderer).createButton('Next question', next),
      ]);
  }

  function whichIsChecked() {
    return UIBackend(renderer).whichIsChecked();
  }

  function setInfoMessage(text) {
    UIBackend(renderer).setInfoMessage(text)
  }

  function clearQuiz() {
    UIBackend(renderer).clear();
  }

  return {
    render,
    whichIsChecked,
    setInfoMessage,
    clearQuiz
  }
}

module.exports = UI;
