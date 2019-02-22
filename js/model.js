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
    },
    getCorrectAnswersCount() {
      let count = 0;

      for(let i = 0; i < questions.length; i++) {
        if(questions[i].getCorrectAnswer() === userAnswers[i]) {
          count++;
        }
      }

      return count;
    }
  };
}

module.exports = Quiz;
