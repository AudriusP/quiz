// igyvendinti jquire .attr {}
// perpiesiant
//function createAnswerContainer(choiseid) {
//  return create('p', {}, [create('input', {name: 'answer', type: 'radio', id: choiseid}, ), create('label', {for: choiceId, id: choiseid}, )]);
//}
// paduoti objekta su atributais ir priskirti, iteracija su objektu raktais

let questionContainer;
let quizContainer;
let infoContainer;
let radioButtons = [];
let choicesContainers = [];

function construct(enterElement, next, back) {
  quizContainer = create('div', {id: 'quiz'});

  questionContainer = create('p', {id: 'questionContainer'});
  quizContainer.appendChild(questionContainer);

  for (let i = 0; i < 4; i++) {
    const choiceId = 'choice' + i;

    const p = create('p');
    const input = create('input', {name: 'answer', type: 'radio', id: choiceId});
    p.appendChild(input);
    radioButtons.push(input);

    const label = create('label', {htmlFor: choiceId});
    p.appendChild(label);
    choicesContainers.push(label);

    quizContainer.appendChild(p);
  }

  quizContainer.appendChild(create('button', {onclick: back}, [createText('Previous question')]));
  quizContainer.appendChild(create('button', {onclick: next}, [createText('Next question')]));

  infoContainer = create('p', {id: 'infoMessage'});

  enterElement.appendChild(quizContainer);
  enterElement.appendChild(infoContainer)
}

function setQuestion(Question, userAnswer) {
  questionContainer.innerHTML = Question.getQuestion();
  setAnswers(Question.getAnswers(), userAnswer);
}

function setAnswers(answers, userAnswer) {
  for (let i = 0; i < choicesContainers.length; i++) {
    choicesContainers[i].innerHTML = answers[i];
    if (userAnswer !== undefined) {
      radioButtons[userAnswer].checked = true;
    }
    else {
      radioButtons[i].checked = false;
    }
  }
}

function setInfoMessage(message) {
  infoContainer.innerHTML = message;
}

function whichIsChecked() {
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      setInfoMessage('');
      return i;
    }
  }
  return -1;
}

function clearQuiz() {
  quizContainer.remove();
}

function create(elementType, attributes, children) {
  const element = document.createElement(elementType);

  for(let key in attributes) {
    console.log(key, attributes[key]);
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

module.exports = {
  construct,
  setQuestion,
  setInfoMessage,
  whichIsChecked,
  clearQuiz
}