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
// MVC pattern ? -> Controller gets state (Quiz) and says what to do -> message or else
//Immutable? Mutable?
// Or in model - advance, regress returns error or obj
  function next() {
    let message;
    if (quiz.getUserAnswer()) {
      if (notLastQuestion()) {
        quiz = quiz.advance();
      }
      else {
        message = 'You answered ' + quiz.getCorrectAnswersCount() + ' questions correctly!';
      }
    }
    else {
      message = 'Choose answer!';
    }
    rerender(message);
  }

  function back() {
    let message;
    if (notFirstQuestion()) {
      quiz = quiz.regress();
    }
    else {
      message = 'This is first question!';
    }
    rerender(message);
  }

  function onChangeCallback(id) {
    quiz.setUserAnswer(id);
  }

  function notLastQuestion() {
    return quiz.getCurrentQuestionId() !== (quiz.getQuestions().length - 1);
  }

  function notFirstQuestion() {
    return quiz.getCurrentQuestionId() !== 0;
  }

  function getUserAnswerId() {
    return quiz.getCurrentQuestion().getAnswers().indexOf(quiz.getUserAnswer());
  }

  return {
    run
  }
}

module.exports = QuizApp;
