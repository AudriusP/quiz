const {getCorrectAnswersCount} = require('./calculator');
// Listen on Change? function -> use where returning Quiz - if changed - call callback who asked
// Maybe _status - just in with code what to do with message
function Quiz(_questions = [], _currentQuestion = 0, _userAnswers = [], _messageCode = 0) {
  let questions = _questions;
  let currentQuestion = _currentQuestion;
  let userAnswers = _userAnswers;
  let messageCode = _messageCode;

  return {
  	getCurrentQuestion() {
  		return questions[currentQuestion];
  	},
    setUserAnswer(answer) {
      const _userAnswers = userAnswers;
      if(questions[currentQuestion].getAnswers().indexOf(answer) != -1) {
        _userAnswers[currentQuestion] = answer;
      } else {
        _userAnswers[currentQuestion] = undefined;
      }

      return Quiz(questions, currentQuestion, userAnswers);
    },
    getUserAnswer() {
      return userAnswers[currentQuestion];
    },
    getCorrectAnswersCount() {
      return getCorrectAnswersCount(questions, userAnswers);
    },
    getMessageCode() {
      return messageCode;
    },
  	advance() {
      let _messageCode = 0;
      let _currentQuestion = currentQuestion;

      if(!userAnswers[currentQuestion]) {
        _messageCode = 1;
      } else if (currentQuestion == questions.length - 1) {
        _messageCode = 3;
      } else {
        _currentQuestion++;
      }

      return Quiz(questions, _currentQuestion, userAnswers, _messageCode);
  	},
    regress() {
      let _messageCode = 0;
      let _currentQuestion = currentQuestion;

      if(currentQuestion == 0) {
        _messageCode = 2;
      } else {
        _currentQuestion--;
      }

      return Quiz(questions, _currentQuestion, userAnswers, _messageCode);
    },
  };
}

module.exports = Quiz;
