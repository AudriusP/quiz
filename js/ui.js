//Render Quiz in Console?
//Canvas API in HTML?
//Tests - helps or not?
//Pure Function - read
//React -> React Native - using same parts? Paint app? Pixel based? Saving
const UIBackend = require('./ui-backend');


function UI(renderer) {
  const ui = UIBackend(renderer);

  function render(next, back, onChangeCallback, Question, userAnswer, message = '') {
    ui.clear();
    ui.addContainer([
      ui.createText(Question.getQuestion()),
      ...Question.getAnswers().map((answer, index) => ui.createChoice(answer, index, userAnswer, onChangeCallback)),
      ui.createButton('Previous question', back),
      ui.createButton('Next question', next),
      ]);
    ui.addContainer([
      ui.createText(message),
    ]);
  }

  return {
    render
  }
}

module.exports = UI;
