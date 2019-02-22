const assert = require('assert');
const UI = require('./ui');
const UIBackend = require('./ui-backend');
const {Suite, test} = require('./tests-runner');
const SpyObject = require('./spyObject.js');

// createSpyObj (Jasmine)
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

Suite('UI(renderer()).render(values)', [
	test('should pass all values to renderer', () => {
		UI(fakeRenderer('app')).render(() => {}, () => {}, () => {}, fakeQuestion, 0, 'message');
		spy.remove.assertCalls(1);

		spy.getQuestion.assertCalls(1);
		spy.addText.assertArgument('fakeQuestion');

		spy.getAnswers.assertCalls(1);
		spy.createChoice.assertArgument('answer1');
		spy.createChoice.assertArgument('answer2');

		spy.createButton.assertArgument('Previous question');
		spy.createButton.assertArgument('Next question');
		spy.createButton.assertCalls(2);

		spy.addText.assertArgument('message');
	})]).runTests();


/*
model = Quiz(...);

model.onChange(() => UI.render(model));

q = model.getCurrentQuestion();

backend.render({
	row: q.getAnswers().map((answer, i) => 
		({choice: answer, selected: currentAnswer === i, onClick: () => model.answerCurrentQuestion(i)}))
})
*/

/*
describe('Quiz', () => {
	it('should render question, choices, and navigation buttons', () => {
		API = fakeAPI().returns({
			questions: [
			   question: 'Question',
			   answers: ['Answer 1', 'Answer 2'],
			   correctAnswerIndex: 0,
			]
		})
		backend = fakeHtmlBackend();
		Quick(UI(backend), API).run();
		expect(backend.render).wasCalledWith({
			rows: [
				{text: 'Question'},
				{rows: [
					{choice: 'Answer 1', selected: false, onClick: () => {}},
					{choice: 'Answer 2', selected: false, onClick: () => {}}
				]}
			]
		});
	});
});
*/


