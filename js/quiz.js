const Question = require('./question');
const Quiz = require('./model');

function QuizApp(UI, getJSON) {

  // replace all these, with model object from 'model.js', 
  // all mutations should happen inside model.
  let quiz;

  function run() {
    let questions = [];

    getJSON('./data/data.json', function (json) {
      for(let i = 0; i < json.questions.length; i++) {
        questions[i] = new Question(json.questions[i].question, json.questions[i].answers, json.questions[i].correctAnswer);
      }
      quiz = new Quiz(questions)
      rerender();
    });
  }

function rerender(message) {
  UI.render(next, back, onChangeCallback, quiz.getCurrentQuestion(), getUserAnswerId(), message);
}

  function next() {
    if (quiz.getUserAnswer()) {
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
    quiz.setUserAnswer(id);
  }

  function notLastQuestion() {
    return quiz.getCurrentQuestionId() !== (quiz.getQuestions().length - 1);
  }

  function nextQuestion() {
    quiz = quiz.advance();
    rerender();
  }

  function notFirstQuestion() {
    return quiz.getCurrentQuestionId() !== 0;
  }

  function previousQuestion() {
    quiz = quiz.regress();
    rerender();
  }

  function getCorrectAnswersCount() {
    let correctAnswers = 0;

    for(let i = 0; i < quiz.getQuestions().length; i++) {
      if (quiz.getQuestions()[i].getCorrectAnswer() === quiz.getUserAnswer(i)) {
        correctAnswers++;
      }
    }
    return correctAnswers;
  }

  function getUserAnswerId() {
    return quiz.getCurrentQuestion().getAnswers().indexOf(quiz.getUserAnswer());
  }

  function finish() {
    rerender('You answered ' + getCorrectAnswersCount() + ' questions correctly!');
  }

  return {
    run
  }
}

module.exports = QuizApp;
