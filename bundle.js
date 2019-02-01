(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function HTML(enterElementId) {
	const choicesIds = [];

	function addContainer(elements) {
		const enterElement = getEl(enterElementId);
		const element = create('div', {id: 'quiz'}, []);
		enterElement.appendChild(element);

		for (let i = 0; i < elements.length; i++) {
			element.appendChild(elements[i]);
		}
	}

	function addText(text) {
		return create('div', {}, [createText(text)]);
	}

	function createChoice(text, userAnswer) {
		let isChecked = false;

		if(userAnswer === choicesIds.length) {
			isChecked = true;
		}
		
		choicesIds.push(text);
		return createChoiceContainer(text, isChecked);
	}

	function createButton(text, fnc) {
		return create('button', {onclick: fnc}, [createText(text)]);
	}

	function clear() {
		clearQuiz();
		clearInfoMessage();
		choicesIds.length = 0;
	}

	function whichIsChecked() {
		for (let i = 0; i < choicesIds.length; i++) {
			if (getEl(choicesIds[i]).checked) {
				setInfoMessage('');
				return i;
			}
		}
		return -1;
	}

	function setInfoMessage(text) {
		clearInfoMessage();
		getEl(enterElementId).appendChild(create('div', {id: 'infoMessage'}, [createText(text)]));
	}

	return{
		addContainer,
		addText,
		createChoice,
		createButton,
		clear,
		whichIsChecked,
		setInfoMessage
	}
}
/*
function createChoices(choicesNumber) {
	const choicesContainer = create('p');
	choicesIds = [];
	for (let i = 0; i < choicesNumber; i++) {
		choicesIds.push('choice' + i);
		choicesContainer.appendChild(createChoiceContainer(choicesIds[i]));
	}
	return choicesContainer;
}
*/
function createChoiceContainer(text, isChecked) {
	return create('p', {}, [
		create('input', {name: 'answer', type: 'radio', id: text, checked: isChecked}),
		create('label', {htmlFor: text}, [createText(text)])
		]);
}
/*
function setQuestion(Question, userAnswer) {
	document.getElementById('questionContainer').innerHTML = Question.getQuestion();
	setAnswers(Question.getAnswers(), userAnswer);
}

function setAnswers(answers, userAnswer) {
	for (let i = 0; i < choicesIds.length; i++) {
		getEl(choicesIds[i]).parentNode.getElementsByTagName('label')[0].innerHTML = answers[i];
		if (userAnswer !== undefined) {
			getEl(choicesIds[userAnswer]).checked = true;
		}
		else {
			getEl(choicesIds[i]).checked = false;
		}
	}
}
*/

function clearQuiz() {
	if(getEl('quiz')) {
		getEl('quiz').remove();
	}
}

function clearInfoMessage() {
	if(getEl('infoMessage')) {
		getEl('infoMessage').remove();
	}
}

function create(elementType, attributes, children) {
	const element = document.createElement(elementType);

	for(let key in attributes) {
		element[key] = attributes[key];
	}

	if(children) {
		for(let i = 0; i < children.length; i++) {
			element.appendChild(children[i]);
		}
	}

	return element;
}

function createText(text) {
	return document.createTextNode(text);
}

function getEl(elementId) {
	return document.getElementById(elementId);
}

module.exports = HTML;

},{}],2:[function(require,module,exports){
const Quiz = require('./quiz');
const UI = require('./ui');
const HTML = require('./html')

Quiz(UI(HTML('app')), $.getJSON).run();
},{"./html":1,"./quiz":4,"./ui":6}],3:[function(require,module,exports){
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

  return {
    getQuestion: getQuestion,
    getAnswers: getAnswers,
    getCorrectAnswerId: getCorrectAnswerId
  }
};

module.exports = Question;
},{}],4:[function(require,module,exports){
const Question = require('./question');


function Quiz(UI, getJSON) {
  let questions = [];
  let currentQuestion = 0;
  let userAnswers = [];

  function run() {

    getJSON('./data/data.json', function (json) {
      for(let i = 0; i < json.questions.length; i++) {
        questions[i] = new Question(json.questions[i].question, json.questions[i].answers, json.questions[i].correctAnswer);
      }
      UI.render(next, back, questions[0]);
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
    UI.render(next, back, questions[currentQuestion], userAnswers[currentQuestion]);
  //UI.setQuestion(questions[currentQuestion], userAnswers[currentQuestion]);
}

function notFirstQuestion() {
  return currentQuestion !== 0;
}

function previousQuestion() {
  currentQuestion--;
  UI.render(next, back, questions[currentQuestion], userAnswers[currentQuestion]);
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

},{"./question":3}],5:[function(require,module,exports){
function UIBackend(renderer) {
	function addContainer(elements) {
		renderer.addContainer(elements);
	}

	function createText(text) {
		return renderer.addText(text);
	}

	function createChoice(text, userAnswer) {
		return renderer.createChoice(text, userAnswer);
	}

	function createButton(text, fnc) {
		return renderer.createButton(text, fnc);
	}

	function clear() {
		renderer.clear();
	}

	function whichIsChecked() {
		return renderer.whichIsChecked();
	}

	function setInfoMessage(text) {
		renderer.setInfoMessage(text);
	}

	return {
		addContainer,
		createText,
		createChoice,
		createButton,
		clear,
		whichIsChecked,
		setInfoMessage
	}
}

module.exports = UIBackend;
},{}],6:[function(require,module,exports){
//UI -> backend UI -> abstraction (not to DOM)
//Render Quiz in Console?
//Canvas API in HTML?
//Tests - helps or not?
//React -> React Native - using same parts? Paint app? Pixel based? Saving
const UIBackend = require('./ui-backend');


function UI(renderer) {

  function render(next, back, Question, userAnswer) {

    UIBackend(renderer).clear();
    UIBackend(renderer).addContainer([
      UIBackend(renderer).createText(Question.getQuestion()),
      ...Question.getAnswers().map(answer => UIBackend(renderer).createChoice(answer, userAnswer)),
      UIBackend(renderer).createButton('Previous question', back),
      UIBackend(renderer).createButton('Next question', next),
      ]);
  }

  function whichIsChecked() {
    return UIBackend(renderer).whichIsChecked();
  }

  function setInfoMessage(text) {
    UIBackend(renderer).setInfoMessage(text)
  }

  function clearQuiz() {
    UIBackend(renderer).clear();
  }

  return {
    render,
    whichIsChecked,
    setInfoMessage,
    clearQuiz
  }
}

module.exports = UI;

},{"./ui-backend":5}]},{},[2]);
