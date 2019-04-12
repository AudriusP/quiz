const UIBackend = require('./ui-backend');

const messageCodes = [
'',
'Choose answer!',
'This is first question!',
'You answered correctly: '
];

function UI(renderer) {
  const ui = UIBackend(renderer);

  function render(next, back, onChangeCallback, Question, userAnswer, messageCode = 0, correctAnswersCount) {
    const checkedId = Question.getAnswers().indexOf(userAnswer);
    ui.clear();
    ui.addContainer([
      ui.createText(Question.getQuestion()),
      ...Question.getAnswers().map((text, index) => {
        let isChecked;
        if(index === checkedId) {
          isChecked = true;
        } else {
          isChecked = false;
        }
        return ui.createChoice(text, isChecked, onChangeCallback);
      }),
      ui.createButton('Previous question', back),
      ui.createButton('Next question', next),
      ]);
    ui.addContainer([
      ui.createText(getMessage(messageCode, correctAnswersCount)),
      ]);
  }
  
  return {
    render
  }
}

function getMessage(messageCode, correctAnswersCount) {
  let message = messageCodes[messageCode];

  if(messageCode === 3) {
    message += correctAnswersCount;
  }
  
  return message;
}

module.exports = UI;
