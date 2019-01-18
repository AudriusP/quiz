const assert = require('assert');
const UI = require('./ui');
const TR = require('./tests-runner');
const Spy = require('./spy.js');

const spyRemove = new Spy();
const spyGetAnswers = new Spy();
const spyGetQuestion = new Spy();
const spyGetElementById = new Spy();

const fakeDocument = {
	getElementById() {
		spyGetElementById.log(arguments);
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
	remove() {
		spyRemove.log();
	},
	parentNode: fakeDocument
}

const fakeQuestion = {
	getQuestion() {
		spyGetQuestion.log()
	},
	getAnswers() {
		spyGetAnswers.log();
		return [];
	}
}

TR.Suite([
	TR.test('UI.render() should work', () => {
		UI(fakeDocument).render('enterElement', () => {}, () => {}, fakeQuestion);
		spyRemove.assertCalls(2);
		spyGetElementById.assertArgument(0, 'enterElement');
		spyGetAnswers.assertCalls(1);
		spyGetQuestion.assertCalls(1);
	}),
	TR.test('UI.setQuestion() should work with fakeQuestion', () => {
		UI(fakeDocument).setQuestion(fakeQuestion);
		spyGetAnswers.assertCalls(2);
		spyGetQuestion.assertCalls(2);
	}),
	TR.test('UI.setInfoMessage() should work', () => {
		UI(fakeDocument).setInfoMessage('Test message');
	}),
	TR.test('UI.whichIsChecked() should return -1 for no checked answers', () => {
		assert.strictEqual(UI(fakeDocument).whichIsChecked(), -1, 'should return -1 for no checked answers');
	}),
	TR.test('UI.clearQuiz() should work', () => {
		UI(fakeDocument).clearQuiz();
		spyRemove.assertCalls(3);
	})
]).runTests();
