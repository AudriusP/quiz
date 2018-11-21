var allQuestions = [];
var radioButtons = [];
var choicesContainers = [];

const Quiz = function () {
  function run(enterElementId) {
    UI.construct(document.getElementById(enterElementId));

    $.getJSON("./data/data.json", function (json) {
      allQuestions = json.allQuestions;
      Question.set(0);
    });
  }

  return {
    run: run
  }
}();

const UI = function () {
  var questionContainer;
  var quizContainer;
  var finishContainer;

  function construct(enterElement) {
    quizContainer = document.createElement('div');
    quizContainer.setAttribute('id', 'quiz');

    questionContainer = document.createElement('p');
    questionContainer.setAttribute('id', 'questionContainer');
    quizContainer.appendChild(questionContainer);

    for (var i = 0; i < 4; i++) {
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
    backButton.setAttribute('onclick', 'Question.back()');
    backButton.appendChild(document.createTextNode("Previous question"));
    quizContainer.appendChild(backButton);

    const nextButton = document.createElement('button');
    nextButton.setAttribute('onclick', 'Question.next()');
    nextButton.appendChild(document.createTextNode("Next question"));
    quizContainer.appendChild(nextButton);

    finishContainer = document.createElement('p');
    finishContainer.setAttribute('id', 'finish');

    enterElement.appendChild(quizContainer);
    enterElement.appendChild(finishContainer)
  }

  function getQuestionContainer() {
    return questionContainer;
  }

  function getQuizContainer() {
    return quizContainer;
  }

  function getFinishContainer() {
    return finishContainer;
  }

  return {
    construct: construct,
    getQuestionContainer: getQuestionContainer,
    getQuizContainer: getQuizContainer,
    getFinishContainer: getFinishContainer
  }
}();

const Question = function () {
  var correctAnswers = 0;
  var currentQuestion = 0;

  function next() {
    if (isAnyChecked()) {
      recordUserAnswer();
      if (isAnswerCorrect() && notYetAnsweredCorrectly()) {
        userAnsweredCorrectly();
      }
      if (notLastQuestion()) {
        nextQuestion();
      }
      else {
        quizFinish("You answered " + correctAnswers + " questions correctly!");
      }
    }
    else {
      setInfoMessage("Choose answer!");
    }
  }

  function back() {
    if (notFirstQuestion()) {
      previousQuestion();
    }
    else {
      setInfoMessage("This is first question!");
    }
  }

  function setQuestion(id) {
    UI.getQuestionContainer().innerHTML = allQuestions[id].question;
    setAnswers(id);
  }

  function setAnswers(id) {
    for (var i = 0; i < choicesContainers.length; i++) {
      choicesContainers[i].innerHTML = allQuestions[id].choices[i];
      if (allQuestions[id].userAnswer || allQuestions[id].userAnswer === 0) {
        radioButtons[allQuestions[id].userAnswer].checked = true;
      }
      else {
        radioButtons[i].checked = false;
      }
    }
  }

  function isAnyChecked() {
    for (var i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i].checked) {
        setInfoMessage("");
        return true;
      }
    }
    return false;
  }

  function whichIsChecked() {
    for (var i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i].checked) {
        return i;
      }
    }
  }

  function isAnswerCorrect() {
    return radioButtons[allQuestions[currentQuestion].correctAnswer].checked;
  }

  function notYetAnsweredCorrectly() {
    return !(allQuestions[currentQuestion].alreadyAnswredCorrectly);
  }

  function recordUserAnswer() {
    allQuestions[currentQuestion].userAnswer = whichIsChecked();
  }

  function userAnsweredCorrectly() {
    correctAnswers++;
    allQuestions[currentQuestion].alreadyAnswredCorrectly = true;
  }

  function nextQuestion() {
    currentQuestion++;
    setQuestion(currentQuestion);
  }

  function quizFinish(message) {
    setInfoMessage(message);
    UI.getQuizContainer().remove();
  }

  function notLastQuestion() {
    return currentQuestion !== (allQuestions.length - 1);
  }

  function notFirstQuestion() {
    return currentQuestion !== 0;
  }

  function previousQuestion() {
    currentQuestion--;
    setQuestion(currentQuestion);
  }

  function setInfoMessage(message) {
    UI.getFinishContainer().innerHTML = message;
  }

  return {
    next: next,
    back: back,
    set: setQuestion
  }
}();
