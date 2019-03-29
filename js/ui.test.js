const assert = require('assert');
const UI = require('./ui');
const UIBackend = require('./ui-backend');
const SpyObject = require('./spyObject.js');

const spy = new SpyObject(['remove', 'getAnswers', 'getQuestion', 'addText', 'createChoice', 'createButton']);

const fakeQuestion = {
	getQuestion() {
		spy.getQuestion.log()
		return 'fakeQuestion';
	},
	getAnswers() {
		spy.getAnswers.log();
		return ['answer1', 'answer2'];
	}
}

function fakeRenderer() {
	function addContainer(){}
	function addText(){
		spy.addText.log(arguments);
	}
	function createChoice(){
		spy.createChoice.log(arguments);
	}
	function createButton(){
		spy.createButton.log(arguments);
	}
	function clear(){
		spy.remove.log();
	}
	return {
		addContainer,
		addText,
		createChoice,
		createButton,
		clear
	}
}

describe('UI(renderer()).render(values)', function() {
    it('should pass all values to renderer', function() {
      	UI(fakeRenderer('app')).render(() => {}, () => {}, () => {}, fakeQuestion, 0, {error: 1});
		spy.remove.assertCalls(1);

		spy.getQuestion.assertCalls(1);
		spy.addText.assertArgument('fakeQuestion');

		spy.getAnswers.assertCalls(2);
		spy.createChoice.assertArgument('answer1');
		spy.createChoice.assertArgument('answer2');

		spy.createButton.assertArgument('Previous question');
		spy.createButton.assertArgument('Next question');
		spy.createButton.assertCalls(2);

		spy.addText.assertArgument('Choose answer!');
    });
});

