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