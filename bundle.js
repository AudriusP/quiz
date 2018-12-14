(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Quiz = require('./quiz');

Quiz.run('app');
},{"./quiz":3}],2:[function(require,module,exports){
function Question(question, answers, correctAnswer) {
  const _question = question;
  const _answers = answers;
  const _correctAnswer = correctAnswer;

  function getQuestion() {
    return _question;
  }

  function getAnswers() {
    return _answers;
  }

  function getCorrectAnswerId() {
    return _correctAnswer;
  }

  return {
    getQuestion: getQuestion,
    getAnswers: getAnswers,
    getCorrectAnswerId: getCorrectAnswerId
  }
};

module.exports = Question;
},{}],3:[function(require,module,exports){
// Clear dependency chain, QuizApp controls UI and Questions, UI and Question don't know anything about each other or QuizApp.
// onclick not via attribute +
// Quiz.destroy method
// userAnswers Quiz'e +
// no answeredCorrectly method - finish, then calculate +
// duplications (dry) - createElement, etc +
// require, export - common.js modulius - still works +
const Question = require('./question');
const UI = require('./ui');

let questions = [];
let currentQuestion = 0;
let userAnswers = [];

function run(enterElementId) {
  enterElement = document.getElementById(enterElementId);

  UI.construct(enterElement, next, back);

  fillQuestionsData();
}

function fillQuestionsData() {
  $.getJSON('./data/data.json', function (json) {
    for(let i = 0; i < json.questions.length; i++) {
      questions[i] = new Question(json.questions[i].question, json.questions[i].answers, json.questions[i].correctAnswer);
    }
    UI.setQuestion(questions[0]);
  });
}

function next() {
  if (UI.whichIsChecked() != -1) {
    recordUserAnswer();
    if (notLastQuestion()) {
      nextQuestion();
    }
    else {
      finish();
    }
  }
  else {
    UI.setInfoMessage('Choose answer!');
  }
}

function back() {
  if (notFirstQuestion()) {
    previousQuestion();
  }
  else {
    UI.setInfoMessage('This is first question!');
  }
}

function recordUserAnswer() {
  userAnswers[currentQuestion] = UI.whichIsChecked();
}

function notLastQuestion() {
  return currentQuestion !== (questions.length - 1);
}

function nextQuestion() {
  currentQuestion++;
  UI.setQuestion(questions[currentQuestion], userAnswers[currentQuestion]);
}

function notFirstQuestion() {
  return currentQuestion !== 0;
}

function previousQuestion() {
  currentQuestion--;
  UI.setQuestion(questions[currentQuestion], userAnswers[currentQuestion]);
  UI.setInfoMessage('');
}

function getCorrectAnswersCount() {
  let correctAnswers = 0;

  for(let i = 0; i < userAnswers.length; i++) {
    if (questions[i].getCorrectAnswerId() === userAnswers[i]) {
      correctAnswers++;
    }
  }
  return correctAnswers;
}

function finish() {
  UI.clearQuiz();
  UI.setInfoMessage('You answered ' + getCorrectAnswersCount() + ' questions correctly!');
}

function destroy() {
 }

 module.exports = {
  run,
  destroy
};
},{"./question":2,"./ui":4}],4:[function(require,module,exports){
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
},{}]},{},[1]);
