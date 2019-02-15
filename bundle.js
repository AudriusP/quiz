(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//One Canvas

function Canvas(enterElementId) {
	const choicesIds = [];

	function addContainer(elements) {
		const enterElement = getEl(enterElementId);

		for (let i = 0; i < elements.length; i++) {
			enterElement.appendChild(elements[i]);
		}
	}

	function addText(text) {
		const canvas = create('canvas', {id: 'text', height: 25, style: 'display:block'}, []);
		const ctx = canvas.getContext('2d');
		ctx.font = '15px Arial';
		ctx.fillText(text, 10, 15);
		return canvas;
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
		const button = create('canvas', {id: 'button', width: 150, height: 20, onclick: fnc}, []);

		var ctx = button.getContext('2d');
		ctx.rect(0, 0, 150, 20);
		ctx.stroke();

		ctx.font = '15px Arial';
		ctx.fillText(text, 10, 15);
		return button;
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
		const canvas = create('canvas', {id: 'infoMessage', height: 25, style: 'display:block'}, []);
		const ctx = canvas.getContext('2d');
		ctx.font = '15px Arial';
		ctx.fillText(text, 10, 15);

		getEl(enterElementId).appendChild(canvas);
	}

	function createChoiceContainer(text, isChecked) {
		const choice = create('canvas', {id: text, height: 25, style: 'display:block', onclick: () => {checkChoice(text)}}, []);
		choice.setAttribute('data-checked', isChecked);
		const ctx = choice.getContext('2d');

		ctx.beginPath();
		ctx.arc(10, 10, 5, 0, 2 * Math.PI);
		ctx.stroke();

		ctx.font = '15px Arial';
		ctx.fillText(text, 20, 15);
		return choice;
	}

	function checkChoice(text) {
		for (let i = 0; i < choicesIds.length; i++) {
			const choice = getEl(choicesIds[i]);
			const ctx = choice.getContext('2d');
			ctx.lineWidth = '2';
			ctx.strokeStyle = 'white';
			ctx.beginPath();
			ctx.arc(10, 10, 2, 0, 2 * Math.PI);
			ctx.stroke();
			choice.setAttribute('data-checked', false);
		}

		const choice = getEl(text);
		const ctx = choice.getContext('2d');
		ctx.lineWidth = '1';
		ctx.strokeStyle = 'black';
		ctx.beginPath();
		ctx.arc(10, 10, 2, 0, 2 * Math.PI);
		ctx.stroke();
		choice.setAttribute('data-checked', true);
	}

	return {
		addContainer,
		addText,
		createChoice,
		createButton,
		clear,
		whichIsChecked,
		setInfoMessage
	}
}

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

function getEl(elementId) {
	return document.getElementById(elementId);
}

module.exports = Canvas;

},{}],2:[function(require,module,exports){
function HTML(enterElementId) {

	function addContainer(elements) {
		const enterElement = getEl(enterElementId);
		const element = create('div', {}, []);
		enterElement.appendChild(element);

		for (let i = 0; i < elements.length; i++) {
			element.appendChild(elements[i]);
		}
	}

	function addText(text) {
		return create('p', {}, [createText(text)]);
	}

	function createChoice(text, index, userAnswer, onChangeCallback) {
		return createChoiceContainer(text, userAnswer === index, onChangeCallback);
	}

	function createButton(text, fnc) {
		return create('button', {onclick: fnc}, [createText(text)]);
	}

	function clear() {
		document.getElementById(enterElementId).innerHTML = '';
	}

	return{
		addContainer,
		addText,
		createChoice,
		createButton,
		clear
	}
}


function createChoiceContainer(text, isChecked, onChangeCallback) {
	return create('p', {}, [
		create('input', {name: 'answer', type: 'radio', id: text, checked: isChecked, onchange: () => {onChangeCallback(text)}}),
		create('label', {htmlFor: text}, [createText(text)])
		]);
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

},{}],3:[function(require,module,exports){
const Quiz = require('./quiz');
const UI = require('./ui');
const HTML = require('./html');
const Canvas = require('./canvas');

Quiz(UI(HTML('app')), $.getJSON).run();
},{"./canvas":1,"./html":2,"./quiz":5,"./ui":7}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
const Question = require('./question');

function QuizApp(UI, getJSON) {

  // replace all these, with model object from 'model.js', 
  // all mutations should happen inside model.
  let questions = [];
  let currentQuestion = 0;
  let userAnswers = [];

  function run() {
    getJSON('./data/data.json', function (json) {
      for(let i = 0; i < json.questions.length; i++) {
        questions[i] = new Question(json.questions[i].question, json.questions[i].answers, json.questions[i].correctAnswer);
      }
      rerender();
    });
  }

function rerender(message) {
  UI.render(next, back, onChangeCallback, questions[currentQuestion], getUserAnswerId(currentQuestion), message);
}

  function next() {
    if (userAnswers[currentQuestion]) {
      if (notLastQuestion()) {
        nextQuestion();
      }
      else {
        finish();
      }
    }
    else {
      rerender('Choose answer!');
    }
  }

  function back() {
    if (notFirstQuestion()) {
      previousQuestion();
    }
    else {
      rerender('This is first question!');
    }
  }

  function onChangeCallback(id) {
    userAnswers[currentQuestion] = id;
  }

  function notLastQuestion() {
    return currentQuestion !== (questions.length - 1);
  }

  function nextQuestion() {
    currentQuestion++;
    rerender();
  }

  function notFirstQuestion() {
    return currentQuestion !== 0;
  }

  function previousQuestion() {
    currentQuestion--;
    rerender();
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

  function getUserAnswerId(questionId) {
    return questions[questionId].getAnswers().indexOf(userAnswers[questionId])
  }

  function finish() {
    rerender('You answered ' + getCorrectAnswersCount() + ' questions correctly!');
  }

  return {
    run
  }
}

module.exports = QuizApp;

},{"./question":4}],6:[function(require,module,exports){
function UIBackend(renderer) {
	function addContainer(elements) {
		renderer.addContainer(elements);
	}

	function createText(text) {
		return renderer.addText(text);
	}

	function createChoice(text, index, userAnswer, onChangeCallback) {
		return renderer.createChoice(text, index, userAnswer, onChangeCallback);
	}

	function createButton(text, fnc) {
		return renderer.createButton(text, fnc);
	}

	function clear() {
		renderer.clear();
	}

	return {
		addContainer,
		createText,
		createChoice,
		createButton,
		clear
	}
}

module.exports = UIBackend;
},{}],7:[function(require,module,exports){
//UI -> backend UI -> abstraction (not to DOM)
//Render Quiz in Console?
//Canvas API in HTML?
//Tests - helps or not?
//Pure Function - read
//React -> React Native - using same parts? Paint app? Pixel based? Saving
const UIBackend = require('./ui-backend');


function UI(renderer) {

  function render(next, back, onChangeCallback, Question, userAnswer, message = '') {
    UIBackend(renderer).clear();
    UIBackend(renderer).addContainer([
      UIBackend(renderer).createText(Question.getQuestion()),
      ...Question.getAnswers().map((answer, index) => UIBackend(renderer).createChoice(answer, index, userAnswer, onChangeCallback)),
      UIBackend(renderer).createButton('Previous question', back),
      UIBackend(renderer).createButton('Next question', next),
      ]);
    UIBackend(renderer).addContainer([
      UIBackend(renderer).createText(message),
    ]);
  }

  return {
    render
  }
}

module.exports = UI;

},{"./ui-backend":6}]},{},[3]);
