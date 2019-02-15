const Question = require('./question');

function QuizApp(UI, getJSON) {

  // replace all these, with model object from 'model.js', 
  // all mutations should happen inside model.
  let questions = [];
  let currentQuestion = 0;
  let userAnswers = [];

  function run() {
    getJSON('./data/data.json', function (json) {
      for(let i = 0; i < json.questions.length; i++) {
        questions[i] = new Question(json.questions[i].question, json.questions[i].answers, json.questions[i].correctAnswer);
      }
      rerender();
    });
  }

function rerender(message) {
  UI.render(next, back, onChangeCallback, questions[currentQuestion], getUserAnswerId(currentQuestion), message);
}

  function next() {
    if (userAnswers[currentQuestion]) {
      if (notLastQuestion()) {
        nextQuestion();
      }
      else {
        finish();
      }
    }
    else {
      rerender('Choose answer!');
    }
  }

  function back() {
    if (notFirstQuestion()) {
      previousQuestion();
    }
    else {
      rerender('This is first question!');
    }
  }

  function onChangeCallback(id) {
    userAnswers[currentQuestion] = id;
  }

  function notLastQuestion() {
    return currentQuestion !== (questions.length - 1);
  }

  function nextQuestion() {
    currentQuestion++;
    rerender();
  }

  function notFirstQuestion() {
    return currentQuestion !== 0;
  }

  function previousQuestion() {
    currentQuestion--;
    rerender();
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

  function getUserAnswerId(questionId) {
    return questions[questionId].getAnswers().indexOf(userAnswers[questionId])
  }

  function finish() {
    rerender('You answered ' + getCorrectAnswersCount() + ' questions correctly!');
  }

  return {
    run
  }
}

module.exports = QuizApp;
