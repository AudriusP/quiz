// igyvendinti jquire .attr {}
// perpiesiant
//function createAnswerContainer(choiseid) {
//  return create('p', {}, [create('input', {name: 'answer', type: 'radio', id: choiseid}, ), create('label', {for: choiceId, id: choiseid}, )]);
//}
// paduoti objekta su atributais ir priskirti, iteracija su objektu raktais

let choicesIds = [];

function construct(enterElement, next, back) {
  enterElement.appendChild(create('div', {id: 'quiz'}, [
    create('p', {id: 'questionContainer'}),
    createChoices(4),
    create('button', {onclick: back}, [createText('Previous question')]),
    create('button', {onclick: next}, [createText('Next question')])
    ]));
  enterElement.appendChild(create('p', {id: 'infoMessage'}));
}

function createChoices(choicesNumber) {
  const choicesContainer = create('p');
  for (let i = 0; i < choicesNumber; i++) {
    choicesIds.push('choice' + i);
    choicesContainer.appendChild(createChoiceContainer(choicesIds[i]));
  }
  return choicesContainer;
}

function createChoiceContainer(choiceId) {
  return create('p', {}, [
    create('input', {name: 'answer', type: 'radio', id: choiceId}),
    create('label', {htmlFor: choiceId})
    ]);
}

function setQuestion(Question, userAnswer) {
  document.getElementById('questionContainer').innerHTML = Question.getQuestion();
  setAnswers(Question.getAnswers(), userAnswer);
}

function setAnswers(answers, userAnswer) {
  for (let i = 0; i < choicesIds.length; i++) {
    getEl(choicesIds[i]).parentNode.getElementsByTagName('label')[0].innerHTML = answers[i];
    if (userAnswer !== undefined) {
      getEl(choicesIds[userAnswer]).checked = true;
    }
    else {
      getEl(choicesIds[i]).checked = false;
    }
  }
}

function setInfoMessage(message) {
  getEl('infoMessage').innerHTML = message;
}

function whichIsChecked() {
  for (let i = 0; i < choicesIds.length; i++) {
    if (getEl(choicesIds[i]).checked) {
      setInfoMessage('');
      return i;
    }
  }
  return -1;
}

function clearQuiz() {
  getEl('quiz').remove();
}

function create(elementType, attributes, children) {
  const element = document.createElement(elementType);

  for(let key in attributes) {
    element[key] = attributes[key];
  }

  if(children) {
    for(let i = 0; i < children.length; i++) {
      element.appendChild(children[i]);
    }
  }

  return element;
}

function createText(text) {
  return document.createTextNode(text);
}

function getEl(elementId) {
  return document.getElementById(elementId);
}

module.exports = {
  construct,
  setQuestion,
  setInfoMessage,
  whichIsChecked,
  clearQuiz
}