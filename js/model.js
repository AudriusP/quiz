function Quiz(_questions = [], _currentQuestion = 0, _userAnswers = []) {
  let questions = _questions;
  let currentQuestion = _currentQuestion;
  let userAnswers = _userAnswers;

  return {
  	getQuestions() {
  		return questions;
  	},
  	getCurrentQuestion() {
  		return questions[currentQuestion];
  	},
    getCurrentQuestionId() {
      return currentQuestion;
    },
    setUserAnswer(answer) {
      userAnswers[currentQuestion] = answer;
    },
    getUserAnswer(questionId = currentQuestion) {
      return userAnswers[questionId];
    },
  	advance() {
  		return Quiz(questions, currentQuestion + 1, userAnswers);
  	},
    regress() {
      return Quiz(questions, currentQuestion - 1, userAnswers);
    }
  };
}

module.exports = Quiz;
