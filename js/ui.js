let questionContainer;
let quizContainer;
let infoContainer;
let radioButtons = [];
let choicesContainers = [];

// perpiesiant
//function createAnswerContainer(choiseid) {
//  return create('p', {}, [create('input', {name: 'answer', type: 'radio', id: choiseid}, ), create('label', {for: choiceId, id: choiseid}, )]);
//}

function construct(enterElement, next, back) {
  quizContainer = create('div');
  quizContainer.setAttribute('id', 'quiz');

  questionContainer = create('p');
  questionContainer.id = 'questionContainer';
  quizContainer.appendChild(questionContainer);


//create('p', {}, [create('input', {name: 'answer', type: 'radio', id: choiseid}, ), create('label', {for: 'choiceId'}, )]);


  for (let i = 0; i < 4; i++) {
    const choiceId = 'choice' + i;

    const p = create('p');
// igyvendinti jquire .attr {}
    const input = create('input');
    input.name = 'answer';
    input.type = 'radio';
    input.id = choiceId;
    p.appendChild(input);
    radioButtons.push(input);

    const label = create('label');
    label.setAttribute('for', choiceId);
    p.appendChild(label);
    choicesContainers.push(label);

    quizContainer.appendChild(p);
  }

  const backButton = create('button');
  backButton.onclick = back;
  backButton.appendChild(createText('Previous question'));
  quizContainer.appendChild(backButton);

  const nextButton = create('button');
  nextButton.onclick = next;
  nextButton.appendChild(createText('Next question'));
  quizContainer.appendChild(nextButton);

  infoContainer = create('p');
  infoContainer.id = 'infoMessage';

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

// paduoti objekta su atributais ir priskirti
//iteracija su objektu raktais
//
function create(elementType, attributes, children) {
  return document.createElement(elementType);
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