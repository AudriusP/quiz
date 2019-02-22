function Question(question, answers, correctAnswer) {
  const _question = question;
  const _answers = answers;
  const _correctAnswer = correctAnswer;

  return {
    getQuestion() {
      return _question;
    },
    getAnswers() {
      return _answers;
    },
    getCorrectAnswer() {
      return _correctAnswer;
    }
  }
};

module.exports = Question;