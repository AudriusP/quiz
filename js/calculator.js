function getCorrectAnswersCount(questions = [], userAnswers = []) {
	let count = 0;

	for(let i = 0; i < questions.length; i++) {
	  if(questions[i].getCorrectAnswer() === userAnswers[i]) {
	    count++;
	  }
	}

	return count;
}

module.exports = {
	getCorrectAnswersCount
};

