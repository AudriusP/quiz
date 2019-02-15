//UI -> backend UI -> abstraction (not to DOM)
//Render Quiz in Console?
//Canvas API in HTML?
//Tests - helps or not?
//Pure Function - read
//React -> React Native - using same parts? Paint app? Pixel based? Saving
const UIBackend = require('./ui-backend');


function UI(renderer) {

  function render(next, back, onChangeCallback, Question, userAnswer) {
    UIBackend(renderer).clear();
    UIBackend(renderer).addContainer([
      UIBackend(renderer).createText(Question.getQuestion()),
      ...Question.getAnswers().map((answer, index) => UIBackend(renderer).createChoice(answer, index, userAnswer, onChangeCallback)),
      UIBackend(renderer).createButton('Previous question', back),
      UIBackend(renderer).createButton('Next question', next),
      ]);
  }

  function renderText(text) {
    UIBackend(renderer).addContainer([
      UIBackend(renderer).createText(text),
    ]);
  }

  function clearQuiz() {
    UIBackend(renderer).clear();
  }

  return {
    render,
    renderText,
    clearQuiz
  }
}

module.exports = UI;
