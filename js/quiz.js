const Quiz = function () {
  var questions = [];
  var correctAnswers = 0;

  function run(enterElementId) {
    UI.construct(document.getElementById(enterElementId));

    $.getJSON("./data/data.json", function (json) {
      questions = json.questions;
      Question.set(0);
    });
  }

  function getQuestionById(id) {
    return questions[id];
  }

  function getQuestionsSize() {
    return questions.length;
  }

  function increaseCorrectAnswers() {
    correctAnswers++;
  }

  function finish() {
    UI.getQuizContainer().remove();
    UI.setInfoMessage("You answered " + correctAnswers + " questions correctly!");
  }

  return {
    run: run,
    getQuestionById: getQuestionById,
    getQuestionsSize: getQuestionsSize,
    increaseCorrectAnswers: increaseCorrectAnswers,
    finish: finish
  }
}();

const UI = function () {
  var questionContainer;
  var quizContainer;
  var infoContainer;
  var radioButtons = [];
  var choicesContainers = [];

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

    infoContainer = document.createElement('p');
    infoContainer.setAttribute('id', 'finish');

    enterElement.appendChild(quizContainer);
    enterElement.appendChild(infoContainer)
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

  return {
    construct: construct,
    getQuestionContainer: getQuestionContainer,
    getQuizContainer: getQuizContainer,
    getChoicesContainerById: getChoicesContainerById,
    getChoicesContainersSize: getChoicesContainersSize,
    getRadioButtonById: getRadioButtonById,
    getRadioButtonsSize: getRadioButtonsSize,
    setInfoMessage: setInfoMessage
  }
}();

const Question = function () {
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
        Quiz.finish();
      }
    }
    else {
      UI.setInfoMessage("Choose answer!");
    }
  }

  function back() {
    if (notFirstQuestion()) {
      previousQuestion();
    }
    else {
      UI.setInfoMessage("This is first question!");
    }
  }

  function setQuestion(id) {
    UI.getQuestionContainer().innerHTML = Quiz.getQuestionById(id).question;
    setAnswers(id);
  }

  function setAnswers(id) {
    for (var i = 0; i < UI.getChoicesContainersSize(); i++) {
      UI.getChoicesContainerById(i).innerHTML = Quiz.getQuestionById(id).choices[i];
      if (Quiz.getQuestionById(id).userAnswer || Quiz.getQuestionById(id).userAnswer === 0) {
        UI.getRadioButtonById(Quiz.getQuestionById(id).userAnswer).checked = true;
      }
      else {
        UI.getRadioButtonById(i).checked = false;
      }
    }
  }

  function isAnyChecked() {
    for (var i = 0; i < UI.getRadioButtonsSize(); i++) {
      if (UI.getRadioButtonById(i).checked) {
        UI.setInfoMessage("");
        return true;
      }
    }
    return false;
  }

  function whichIsChecked() {
    for (var i = 0; i < UI.getRadioButtonsSize(); i++) {
      if (UI.getRadioButtonById(i).checked) {
        return i;
      }
    }
  }

  function isAnswerCorrect() {
    return UI.getRadioButtonById(Quiz.getQuestionById(currentQuestion).correctAnswer).checked;
  }

  function notYetAnsweredCorrectly() {
    return !(Quiz.getQuestionById(currentQuestion).alreadyAnswredCorrectly);
  }

  function recordUserAnswer() {
    Quiz.getQuestionById(currentQuestion).userAnswer = whichIsChecked();
  }

  function userAnsweredCorrectly() {
    Quiz.increaseCorrectAnswers();
    Quiz.getQuestionById(currentQuestion).alreadyAnswredCorrectly = true;
  }

  function nextQuestion() {
    currentQuestion++;
    setQuestion(currentQuestion);
  }

  function notLastQuestion() {
    return currentQuestion !== (Quiz.getQuestionsSize() - 1);
  }

  function notFirstQuestion() {
    return currentQuestion !== 0;
  }

  function previousQuestion() {
    currentQuestion--;
    setQuestion(currentQuestion);
  }

  return {
    next: next,
    back: back,
    set: setQuestion
  }
}();
