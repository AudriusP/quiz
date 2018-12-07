// Clear dependency chain, QuizApp controls UI and Questions, UI and Question don't know anything about each other or QuizApp.
// onclick not via attribute
// Quiz.destroy method
// userAnswers Quiz'e
// no answeredCorrectly method - finish, then calculate
// duplications (dry) - createElement, etc
// require, export - common.js modulius - still works

const Quiz = function () {
  let questions = [];
  let correctAnswers = 0;
  let currentQuestion = 0;
  let userAnswers = [];

  function run(enterElementId) {
    UI.construct(document.getElementById(enterElementId), next, back);

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
      if (isAnswerCorrect() && notYetAnsweredCorrectly()) {
        userAnsweredCorrectly();
      }
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
    questions[currentQuestion].setUserAnswer(UI.whichIsChecked());
  }

  function isAnswerCorrect() {
    return (questions[currentQuestion].getCorrectAnswerId() === questions[currentQuestion].getUserAnswer());
  }

  function notYetAnsweredCorrectly() {
    return !questions[currentQuestion].getAnsweredCorrectly();
  }

  function userAnsweredCorrectly() {
    questions[currentQuestion].setAnsweredCorrectly(true);
    correctAnswers++;
  }

  function notLastQuestion() {
    return currentQuestion !== (questions.length - 1);
  }

  function nextQuestion() {
    currentQuestion++;
    UI.setQuestion(questions[currentQuestion]);
  }

  function notFirstQuestion() {
    return currentQuestion !== 0;
  }

  function previousQuestion() {
    currentQuestion--;
    UI.setQuestion(questions[currentQuestion]);
    UI.setInfoMessage('');
  }

    function finish() {
    UI.setInfoMessage('You answered ' + correctAnswers + ' questions correctly!');
  }

  return {
    run: run,
    //destroy
    //next: next,
    //back: back
  }
}();

const UI = function () {
  let questionContainer;
  let quizContainer;
  let infoContainer;
  let radioButtons = [];
  let choicesContainers = [];

  function construct(enterElement, next, back) {
    quizContainer = document.createElement('div');
    quizContainer.setAttribute('id', 'quiz');

    questionContainer = document.createElement('p');
    questionContainer.setAttribute('id', 'questionContainer');
    quizContainer.appendChild(questionContainer);

    for (let i = 0; i < 4; i++) {
      const choiceId = 'choice' + i;

      const p = document.createElement('p');

      const input = document.createElement('input');
      input.setAttribute('name', 'answer');
      input.setAttribute('type', 'radio');
      input.setAttribute('id', choiceId);
      p.appendChild(input);
      radioButtons.push(input);

      const label = document.createElement('label');
      label.setAttribute('for', choiceId);
      p.appendChild(label);
      choicesContainers.push(label);

      quizContainer.appendChild(p);
    }

    const backButton = document.createElement('button');
    backButton.onclick = back;
    backButton.appendChild(document.createTextNode('Previous question'));
    quizContainer.appendChild(backButton);

    const nextButton = document.createElement('button');
    nextButton.onclick = next;
    nextButton.appendChild(document.createTextNode('Next question'));
    quizContainer.appendChild(nextButton);

    infoContainer = document.createElement('p');
    infoContainer.setAttribute('id', 'finish');

    enterElement.appendChild(quizContainer);
    enterElement.appendChild(infoContainer)
  }

  function setQuestion(Question) {
    questionContainer.innerHTML = Question.getQuestion();
    setAnswers(Question.getAnswers(), Question.getUserAnswer());
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

  function getQuestionContainer() {
    return questionContainer;
  }

  function getQuizContainer() {
    return quizContainer;
  }

  function getChoicesContainerById(id) {
    return choicesContainers[id];
  }

  function getChoicesContainersSize() {
    return choicesContainers.length;
  }

  function getRadioButtonById(id) {
    return radioButtons[id];
  }

  function getRadioButtonsSize() {
    return radioButtons.length;
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

  return {
    construct,
    setQuestion: setQuestion,
    setInfoMessage: setInfoMessage,
    whichIsChecked: whichIsChecked
  }
}();

function Question(question, answers, correctAnswer) {
  const _question = question;
  const _answers = answers;
  const _correctAnswer = correctAnswer;
  let _userAnswer;
  let _answeredCorrectly;
  //user answers kitur

  function getQuestion() {
    return _question;
  }

  function getAnswers() {
    return _answers;
  }

  function getCorrectAnswerId() {
    return _correctAnswer;
  }

  function getUserAnswer() {
    return _userAnswer;
  }

  function setUserAnswer(answerId) {
    _userAnswer = answerId;
  }

  function getAnsweredCorrectly() {
    return _answeredCorrectly;
  }

  function setAnsweredCorrectly(answeredCorrectly) {
    _answeredCorrectly = answeredCorrectly;
  }

  return {
    getQuestion: getQuestion,
    getAnswers: getAnswers,
    getCorrectAnswerId: getCorrectAnswerId,
    getUserAnswer: getUserAnswer,
    setUserAnswer: setUserAnswer,
    getAnsweredCorrectly: getAnsweredCorrectly,
    setAnsweredCorrectly: setAnsweredCorrectly
  }
};

module.exports = {
  Quiz
};
