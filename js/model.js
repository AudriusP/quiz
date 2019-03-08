function Quiz(_questions = [], _currentQuestion = 0, _userAnswers = [], _message = '') {
  let questions = _questions;
  let currentQuestion = _currentQuestion;
  let userAnswers = _userAnswers;
  let message = _message;

  function getCorrectAnswersCount() {
    let count = 0;

    for(let i = 0; i < questions.length; i++) {
      if(questions[i].getCorrectAnswer() === userAnswers[i]) {
        count++;
      }
    }

    return count;
  }

  return {
  	getCurrentQuestion() {
  		return questions[currentQuestion];
  	},
    setUserAnswer(answer) {
      userAnswers[currentQuestion] = answer;
      return Quiz(questions, currentQuestion, userAnswers);
    },
    getUserAnswerId() {
      return questions[currentQuestion].getAnswers().indexOf(userAnswers[currentQuestion]);
    },
    getMessage() {
      return message;
    },
  	advance() {
      let _message = '';
      let _currentQuestion = currentQuestion;

      if(!userAnswers[currentQuestion]) {
        _message = 'Choose answer!';
      } else if (currentQuestion == questions.length - 1) {
        _message = 'You answered ' + getCorrectAnswersCount() + ' questions correctly!';
      } else {
        _currentQuestion++;
      }
      return Quiz(questions, _currentQuestion, userAnswers, _message);
  	},
    regress() {
      let _message = '';
      let _currentQuestion = currentQuestion;

      if(currentQuestion == 0) {
        _message = 'This is first question!';
      } else {
        _currentQuestion--;
      }
      return Quiz(questions, _currentQuestion, userAnswers, _message);
    },
  };
}

module.exports = Quiz;
