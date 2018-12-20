const Question = require('./question');


function Quiz(UI, getJSON) {
  let questions = [];
  let currentQuestion = 0;
  let userAnswers = [];
  let _enterElementId;

  function run(enterElementId) {
    _enterElementId = enterElementId;

    getJSON('./data/data.json', function (json) {
      for(let i = 0; i < json.questions.length; i++) {
        questions[i] = new Question(json.questions[i].question, json.questions[i].answers, json.questions[i].correctAnswer);
      }
      UI.render(_enterElementId, next, back, questions[0]);
    });
  }

  function next() {
    if (UI.whichIsChecked() != -1) {
      recordUserAnswer();
      if (notLastQuestion()) {
        nextQuestion();
      }
      else {
        finish();
      }
    }
    else {
      UI.setInfoMessage('Choose answer!');
    }
  }

  function back() {
    if (notFirstQuestion()) {
      previousQuestion();
    }
    else {
      UI.setInfoMessage('This is first question!');
    }
  }

  function recordUserAnswer() {
    userAnswers[currentQuestion] = UI.whichIsChecked();
  }

  function notLastQuestion() {
    return currentQuestion !== (questions.length - 1);
  }

  function nextQuestion() {
    currentQuestion++;
    UI.render(_enterElementId, next, back, questions[currentQuestion], userAnswers[currentQuestion]);
  //UI.setQuestion(questions[currentQuestion], userAnswers[currentQuestion]);
}

function notFirstQuestion() {
  return currentQuestion !== 0;
}

function previousQuestion() {
  currentQuestion--;
  UI.render(_enterElementId, next, back, questions[currentQuestion], userAnswers[currentQuestion]);
  //UI.setQuestion(questions[currentQuestion], userAnswers[currentQuestion]);
  //UI.setInfoMessage('');
}

function getCorrectAnswersCount() {
  let correctAnswers = 0;

  for(let i = 0; i < userAnswers.length; i++) {
    if (questions[i].getCorrectAnswerId() === userAnswers[i]) {
      correctAnswers++;
    }
  }
  return correctAnswers;
}

function finish() {
  UI.clearQuiz();
  UI.setInfoMessage('You answered ' + getCorrectAnswersCount() + ' questions correctly!');
}

return {
  run
}
}

module.exports = Quiz;
