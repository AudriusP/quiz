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
  	advance() {
  		return Quiz(questions, currentQuestion + 1, userAnswers);
  	}
  };
}

module.exports = {
	Quiz,
}