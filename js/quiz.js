const Question = require('./question');
const Quiz = require('./model');

function QuizApp(UI, getJSON) {
  //Mocha - run all test files via command line
  //Nerenderint be reikalo, observer/listener pattern -> ar padeda? Kaip ispresti, kad kviesti rereneder tik tada, kai is tikro pasikeicia?

  // Pass current Quiz to model? Then in model check current Quiz with what new Quiz should be returned?
  // Then return in status {rerender: true} if needed?
  // rerender(quiz.getStatus().rerender)?
  // or
  // if(quiz.getStatus().rerender) { rerender()}

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

  function rerender() {
    UI.render(next, back, onChangeCallback, quiz.getCurrentQuestion(), quiz.getUserAnswer(), quiz.getMessageCode(), quiz.getCorrectAnswersCount());
  }

  function next() {
    // 1 possibility - check here quiz -> model quiz returned?
    const _quiz = quiz.advance();
    rerenderIfChanged(_quiz);
  }

  function back() {
    const _quiz = quiz.regress();
    rerenderIfChanged(_quiz);
  }

  function onChangeCallback(id) {
    const _quiz = quiz.setUserAnswer(id);
    rerenderIfChanged(_quiz);
  }

  function rerenderIfChanged(newQuiz) {
    if(newQuiz.getMessageCode() !== quiz.getMessageCode() ||
     newQuiz.getCurrentQuestion() !== quiz.getCurrentQuestion()) {
      quiz = newQuiz;
      console.log('RENDERING');
      rerender();
    }
  }

return {
  run
}
}

module.exports = QuizApp;
