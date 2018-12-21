const assert = require('assert');
const Quiz = require('./quiz');
const UI = require('./ui');

function fakeGetJSON(json) {
	return (url, callback) => callback(json);
}

const fakeUI ={
	render() {}
}

const fakeDocument = {
	getElementById() {
		return fakeElement;
	},
	getElementsByTagName() {
		return [fakeElement];
	},
	createElement() {
		return fakeElement;
	},
	createTextNode() {}
}

const fakeElement = {
	appendChild() {},
	remove() {},
	parentNode: fakeDocument
}

const fakeQuestion = {
	getQuestion() {},
	getAnswers() {
		return [];
	}
}

Quiz(fakeUI, fakeGetJSON({questions: []})).run();

Quiz(fakeUI, fakeGetJSON(require('../data/data.json'))).run();

UI(fakeDocument).setQuestion(fakeQuestion);

UI(fakeDocument).clearQuiz();

UI(fakeDocument).setInfoMessage('Test message');

assert.strictEqual(UI(fakeDocument).whichIsChecked(), -1, 'should return -1 for no checked answers');

UI(fakeDocument).render('enterElement', () => {}, () => {}, fakeQuestion);