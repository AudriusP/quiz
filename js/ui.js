const UIBackend = require('./ui-backend');

const errors = [
'',
'Choose answer!',
'This is first question!'
];

function UI(renderer) {
  const ui = UIBackend(renderer);

  function render(next, back, onChangeCallback, Question, userAnswer, status = {}) {
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
      ui.createText(getMessage(status)),
      ]);
  }
  
  return {
    render
  }
}

  function getMessage(status) {
  if(status.error) {
    return errors[status.error];
  } else if(status.correctAnswers != undefined) {
    return 'You answered ' + status.correctAnswers + ' questions correctly!';
  } else {
    return '';
  }
}

module.exports = UI;
