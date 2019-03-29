const {getCorrectAnswersCount} = require('./calculator');
// Listen on Change? function -> use where returning Quiz - if changed - call callback who asked
// Maybe _status - just in with code what to do with message
function Quiz(_questions = [], _currentQuestion = 0, _userAnswers = [], _status = {}) {
  let questions = _questions;
  let currentQuestion = _currentQuestion;
  let userAnswers = _userAnswers;
  let status = _status;
//Message in UI, model just provides status - error/else
  return {
  	getCurrentQuestion() {
  		return questions[currentQuestion];
  	},
    //test for not existing answer
    setUserAnswer(answer) {
      const _userAnswers = userAnswers;
      if(questions[currentQuestion].getAnswers().indexOf(answer) != -1) {
        _userAnswers[currentQuestion] = answer;
      } else {
        _userAnswers[currentQuestion] = undefined;
      }

      return Quiz(questions, currentQuestion, userAnswers);
    },
    //getUserAnswerId - side effect
    getUserAnswer() {
      return userAnswers[currentQuestion];
    },
    getStatus() {
      return status;
    },
  	advance() {
      let _status = {};
      let _currentQuestion = currentQuestion;

      if(!userAnswers[currentQuestion]) {
        _status = {
          error: 1
        };
      } else if (currentQuestion == questions.length - 1) {
        _status = {
          correctAnswers: getCorrectAnswersCount(questions, userAnswers)
        };
      } else {
        _currentQuestion++;
      }

      return Quiz(questions, _currentQuestion, userAnswers, _status);
  	},
    regress() {
      let _status = {};
      let _currentQuestion = currentQuestion;

      if(currentQuestion == 0) {
        _status = {
          error: 2
        };
      } else {
        _currentQuestion--;
      }

      return Quiz(questions, _currentQuestion, userAnswers, _status);
    },
  };
}

module.exports = Quiz;
