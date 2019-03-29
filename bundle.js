(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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


},{}],2:[function(require,module,exports){
function Canvas(enterElementId) {
	let canvas;
	let canvasRows = 0;
	const enterElement = getEl(enterElementId);

	function addContainer(elements) {
		enterElement.appendChild(canvas);
	}

	function addText(text) {
		canvasRows++;
		const ctx = canvas.getContext('2d');
		ctx.font = '15px Arial';
		ctx.fillText(text, 10, 20 * canvasRows);
	}

	function createChoice(text, isChecked, onChangeCallback) {
		createChoiceContainer(text, isChecked, onChangeCallback);
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
		if(canvas != undefined) {
			enterElement.removeChild(canvas);
		}
		canvasRows = 0;
		canvas = create('canvas', {id: 'container', height: 250, style: 'display:block'}, []);
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

},{}],3:[function(require,module,exports){
function HTML(enterElementId) {
	let containers = [];
	const enterElement = getEl(enterElementId);
	let _enterElement;
	const date = new Date();
	const uniqueId = date.getTime();

	function addContainer(elements) {
		const element = create('div', {}, []);
		_enterElement.appendChild(element);
		containers.push(element);

		for (let i = 0; i < elements.length; i++) {
			element.appendChild(elements[i]);
		}
	}

	function addText(text) {
		return create('p', {}, [createText(text)]);
	}

	function createChoice(text, isChecked, onChangeCallback) {
		return create('p', {}, [
		create('input', {name: 'answer' + uniqueId, type: 'radio', id: text + uniqueId, checked: isChecked, onchange: () => {onChangeCallback(text)}}),
		create('label', {htmlFor: text + uniqueId}, [createText(text)])
		]);
	}

	function createButton(text, fnc) {
		return create('button', {onclick: fnc}, [createText(text)]);
	}

	function clear() {
		if(_enterElement == undefined) {
			_enterElement = create('div', {}, []);
			enterElement.appendChild(_enterElement);
		}
		if(containers.length > 0) {
			containers.forEach(function(container) {
				_enterElement.removeChild(container);
			})
			containers = [];
		}
	}

	return{
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

function createText(text) {
	return document.createTextNode(text);
}

function getEl(elementId) {
	return document.getElementById(elementId);
}

module.exports = HTML;

},{}],4:[function(require,module,exports){
const Quiz = require('./quiz');
const UI = require('./ui');
const HTML = require('./html');
const Canvas = require('./canvas');

Quiz(UI(HTML('app')), $.getJSON).run();
Quiz(UI(HTML('app')), $.getJSON).run();
},{"./canvas":2,"./html":3,"./quiz":7,"./ui":9}],5:[function(require,module,exports){
const {getCorrectAnswersCount} = require('./calculator');

function Quiz(_questions = [], _currentQuestion = 0, _userAnswers = [], _status = {}) {
  let questions = _questions;
  let currentQuestion = _currentQuestion;
  let userAnswers = _userAnswers;
  let status = _status;
//Message in UI, model just provides status - error/else
  return {
  	getCurrentQuestion() {
  		return questions[currentQuestion];
  	},
    //test for not existing answer
    setUserAnswer(answer) {
      const _userAnswers = userAnswers;
      if(questions[currentQuestion].getAnswers().indexOf(answer) != -1) {
        _userAnswers[currentQuestion] = answer;
      } else {
        _userAnswers[currentQuestion] = undefined;
      }

      return Quiz(questions, currentQuestion, userAnswers);
    },
    //getUserAnswerId - side effect
    getUserAnswer() {
      return userAnswers[currentQuestion];
    },
    getStatus() {
      return status;
    },
  	advance() {
      let _status = {};
      let _currentQuestion = currentQuestion;

      if(!userAnswers[currentQuestion]) {
        _status = {
          error: 1
        };
      } else if (currentQuestion == questions.length - 1) {
        _status = {
          correctAnswers: getCorrectAnswersCount(questions, userAnswers)
        };
      } else {
        _currentQuestion++;
      }

      return Quiz(questions, _currentQuestion, userAnswers, _status);
  	},
    regress() {
      let _status = {};
      let _currentQuestion = currentQuestion;

      if(currentQuestion == 0) {
        _status = {
          error: 2
        };
      } else {
        _currentQuestion--;
      }

      return Quiz(questions, _currentQuestion, userAnswers, _status);
    },
  };
}

module.exports = Quiz;

},{"./calculator":1}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
const Question = require('./question');
const Quiz = require('./model');

function QuizApp(UI, getJSON) {
  //Mocha/Jest - ?
  //Keli quiz appsai?
  //Nerenderint be reikalo, observer/listener pattern -> ar padeda? Kaip ispresti, kad kviesti rereneder tik tada, kai is tikro pasikeicia?
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
    UI.render(next, back, onChangeCallback, quiz.getCurrentQuestion(), quiz.getUserAnswer(), quiz.getStatus());
  }

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

},{"./model":5,"./question":6}],8:[function(require,module,exports){
function UIBackend(renderer) {
	function addContainer(elements) {
		renderer.addContainer(elements);
	}

	function createText(text) {
		return renderer.addText(text);
	}

	function createChoice(text, isChecked, onChangeCallback) {
		return renderer.createChoice(text, isChecked, onChangeCallback);
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

},{}],9:[function(require,module,exports){
const UIBackend = require('./ui-backend');

const errors = [
'',
'Choose answer!',
'This is first question!'
];

function UI(renderer) {
  const ui = UIBackend(renderer);

  function render(next, back, onChangeCallback, Question, userAnswer, status = {}) {
    const checkedId = Question.getAnswers().indexOf(userAnswer);
    ui.clear();
    ui.addContainer([
      ui.createText(Question.getQuestion()),
      ...Question.getAnswers().map((text, index) => {
        let isChecked;
        if(index === checkedId) {
          isChecked = true;
        } else {
          isChecked = false;
        }
        return ui.createChoice(text, isChecked, onChangeCallback);
      }),
      ui.createButton('Previous question', back),
      ui.createButton('Next question', next),
      ]);
    ui.addContainer([
      ui.createText(getMessage(status)),
      ]);
  }
  
  return {
    render
  }
}

  function getMessage(status) {
  if(status.error) {
    return errors[status.error];
  } else if(status.correctAnswers != undefined) {
    return 'You answered ' + status.correctAnswers + ' questions correctly!';
  } else {
    return '';
  }
}

module.exports = UI;

},{"./ui-backend":8}]},{},[4]);
