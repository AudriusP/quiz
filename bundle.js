(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function Canvas(enterElementId) {
	let canvas;
	let canvasRows = 0;

	function addContainer(elements) {
		const enterElement = getEl(enterElementId);
		enterElement.appendChild(canvas);
	}

	function addText(text) {
		canvasRows++;
		const ctx = canvas.getContext('2d');
		ctx.font = '15px Arial';
		ctx.fillText(text, 10, 20 * canvasRows);
	}

	function createChoice(text, index, userAnswer, onChangeCallback) {
		createChoiceContainer(text, userAnswer === index, onChangeCallback);
	}

	function createButton(text, fnc) {
		canvasRows++;
		const buttonX = 0;
		const buttonY = 20 * canvasRows - 15;
		const ctx = canvas.getContext('2d');

		ctx.rect(buttonX, buttonY, 150, 20);
		ctx.stroke();

		ctx.font = '15px Arial';
		ctx.fillText(text, 10, 20 * canvasRows);

		canvas.addEventListener('click', (e) => {
			const pos = {
				x: e.clientX,
				y: e.clientY
			}

			if (pos.x >= buttonX && pos.x <= buttonX + 150 &&
				pos.y >= buttonY && pos.y <= buttonY + 20) {
				fnc();
			}
		});
	}

	function clear() {
		document.getElementById(enterElementId).innerHTML = '';
		canvasRows = 0;
		canvas = create('canvas', {id: 'container', height: 500, style: 'display:block'}, []);
	}

	function createChoiceContainer(text, isChecked, onChangeCallback) {
		canvasRows++;
		const currentCanvasRows = canvasRows;
		const containerX = 0;
		const containerY = 20 * canvasRows - 7;
		const ctx = canvas.getContext('2d');

		ctx.beginPath();
		ctx.arc(10, 20 * canvasRows- 5, 5, 0, 2 * Math.PI);
		ctx.stroke();

		ctx.font = '15px Arial';
		ctx.fillText(text, 20, 20 * canvasRows);

		if(isChecked) {
			ctx.beginPath();
			ctx.arc(10, 20 * currentCanvasRows - 5, 2, 0, 2 * Math.PI);
			ctx.stroke();
		}

		canvas.addEventListener('click', (e) => {
			const pos = {
				x: e.clientX,
				y: e.clientY
			}

			if (pos.x >= containerX && pos.x <= containerX + 150 &&
				pos.y >= containerY && pos.y <= containerY + 15) {
				onChangeCallback(text);
				const ctx = canvas.getContext('2d');
				ctx.beginPath();
				ctx.arc(10, 20 * currentCanvasRows - 5, 2, 0, 2 * Math.PI);
				ctx.stroke();
			}
		});
	}

	return {
		addContainer,
		addText,
		createChoice,
		createButton,
		clear
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
},{"./canvas":1,"./html":2,"./quiz":6,"./ui":8}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
const Question = require('./question');
const Quiz = require('./model');

function QuizApp(UI, getJSON) {
  let quiz;

  function run() {
    let questions = [];

    getJSON('./data/data.json', function (json) {
      for(let i = 0; i < json.questions.length; i++) {
        questions[i] = new Question(json.questions[i].question, json.questions[i].answers, json.questions[i].correctAnswer);
      }
      quiz = new Quiz(questions)
      rerender();
    });
  }

function rerender() {
  UI.render(next, back, onChangeCallback, quiz.getCurrentQuestion(), quiz.getUserAnswerId(), quiz.getMessage());
}
// MVC pattern ? -> Controller gets state (Quiz) and says what to do -> message or else
//Immutable? Mutable?
// Or in model - advance, regress returns error or obj
  function next() {
    quiz = quiz.advance();
    rerender();
  }

  function back() {
    quiz = quiz.regress();
    rerender();
  }

  function onChangeCallback(id) {
    quiz = quiz.setUserAnswer(id);
    rerender();
  }

  return {
    run
  }
}

module.exports = QuizApp;

},{"./model":4,"./question":5}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
//Render Quiz in Console?
//Canvas API in HTML?
//Tests - helps or not?
//Pure Function - read
//React -> React Native - using same parts? Paint app? Pixel based? Saving
const UIBackend = require('./ui-backend');


function UI(renderer) {
  const ui = UIBackend(renderer);

  function render(next, back, onChangeCallback, Question, userAnswer, message = '') {
    ui.clear();
    ui.addContainer([
      ui.createText(Question.getQuestion()),
      ...Question.getAnswers().map((answer, index) => ui.createChoice(answer, index, userAnswer, onChangeCallback)),
      ui.createButton('Previous question', back),
      ui.createButton('Next question', next),
      ]);
    ui.addContainer([
      ui.createText(message),
    ]);
  }

  return {
    render
  }
}

module.exports = UI;

},{"./ui-backend":7}]},{},[3]);
