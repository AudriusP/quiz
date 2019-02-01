const assert = require('assert');
const UI = require('./ui');
const UIBackend = require('./ui-backend');
const TR = require('./tests-runner');
const Spy = require('./spy.js');

const spyRemove = new Spy();
const spyGetAnswers = new Spy();
const spyGetQuestion = new Spy();
const spyFakeRenderer = new Spy();
const spySetInfoMessage = new Spy();

const fakeQuestion = {
	getQuestion() {
		spyGetQuestion.log()
	},
	getAnswers() {
		spyGetAnswers.log();
		return [];
	}
}

function fakeRenderer() {
	spyFakeRenderer.log(arguments);
	function addContainer(){}
	function addText(){}
	function createChoice(){}
	function createButton(){}
	function clear(){
		spyRemove.log();
	}
	function whichIsChecked(){
		return -1;
	}
	function setInfoMessage(){
		spySetInfoMessage.log(arguments);
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

TR.Suite([
	TR.test('UI(rnderer(parameter)).render() should be called with parameter', () => {
		UI(fakeRenderer('app')).render(() => {}, () => {}, fakeQuestion);
		spyRemove.assertCalls(1);
		spyFakeRenderer.assertArgument('app');
		spyGetAnswers.assertCalls(1);
		spyGetQuestion.assertCalls(1);
	}),
	TR.test('UI.setInfoMessage(message) should be called with message', () => {
		UI(fakeRenderer()).setInfoMessage('Test message');
		spySetInfoMessage.assertArgument('Test message');
	}),
	TR.test('UI.whichIsChecked() should return -1 for no checked answers', () => {
		assert.strictEqual(UI(fakeRenderer()).whichIsChecked(), -1, 'should return -1 for no checked answers');
	}),
	TR.test('UI.clearQuiz() should work', () => {
		UI(fakeRenderer()).clearQuiz();
		spyRemove.assertCalls(1);
	})
	],
	() => {
		spyRemove.refresh();
		spyGetAnswers.refresh();
		spyGetQuestion.refresh();
		spySetInfoMessage.refresh();
	}
	).runTests();
