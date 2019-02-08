function Question(question, answers, correctAnswer) {
  const _question = question;
  const _answers = answers;
  const _correctAnswer = correctAnswer;

  function getQuestion() {
    return _question;
  }

  function getAnswers() {
    return _answers;
  }

  function getCorrectAnswerId() {
    return _correctAnswer;
  }

  function getCorrectAnswer() {
    return _answers[_correctAnswer];
  }

  return {
    getQuestion: getQuestion,
    getAnswers: getAnswers,
    getCorrectAnswerId: getCorrectAnswerId,
    getCorrectAnswer
  }
};

module.exports = Question;