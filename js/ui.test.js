const assert = require('assert');
const UI = require('./ui');
const UIBackend = require('./ui-backend');
const TR = require('./tests-runner');
const Spy = require('./spy.js');

const spyRemove = new Spy();
const spyGetAnswers = new Spy();
const spyGetQuestion = new Spy();
const spyAddText = new Spy();
const spyCreateChoice = new Spy();
const spyCreateButton = new Spy();
const spySetInfoMessage = new Spy();

const fakeQuestion = {
	getQuestion() {
		spyGetQuestion.log()
		return 'fakeQuestion';
	},
	getAnswers() {
		spyGetAnswers.log();
		return ['answer1', 'answer2'];
	}
}

function fakeRenderer() {
	function addContainer(){}
	function addText(){
		spyAddText.log(arguments);
	}
	function createChoice(){
		spyCreateChoice.log(arguments);
	}
	function createButton(){
		spyCreateButton.log(arguments);
	}
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
	TR.test('UI(renderer()).render(values) should pass values to renderer', () => {
		UI(fakeRenderer('app')).render(() => {}, () => {}, fakeQuestion);
		spyRemove.assertCalls(1);

		spyGetQuestion.assertCalls(1);
		spyAddText.assertArgument('fakeQuestion');

		spyGetAnswers.assertCalls(1);
		spyCreateChoice.assertArgument('answer1');
		spyCreateChoice.assertArgument('answer2');

		spyCreateButton.assertArgument('Previous question');
		spyCreateButton.assertArgument('Next question');
		spyCreateButton.assertCalls(2);
	}),
	TR.test('UI.whichIsChecked() should return -1 for no checked answers', () => {
		assert.strictEqual(UI(fakeRenderer()).whichIsChecked(), -1, 'should return -1 for no checked answers');
	}),
	TR.test('UI.setInfoMessage(message) should be called with message', () => {
		UI(fakeRenderer()).setInfoMessage('Test message');
		spySetInfoMessage.assertArgument('Test message');
	}),
	TR.test('UI.clearQuiz() should work', () => {
		UI(fakeRenderer()).clearQuiz();
		spyRemove.assertCalls(1);
	})
	],
	() => {
		spyRemove.refresh();
	}
	).runTests();
