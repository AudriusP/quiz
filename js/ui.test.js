const assert = require('assert');
const UI = require('./ui');
const UIBackend = require('./ui-backend');
const {Suite, test} = require('./tests-runner');
const Spy = require('./spy.js');

// createSpyObj (Jasmine)
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

Suite('UI(renderer()).render(values)', [
	test('should pass all values to renderer', () => {
		UI(fakeRenderer('app')).render(() => {}, () => {}, () => {}, fakeQuestion, 0, 'message');
		spyRemove.assertCalls(1);

		spyGetQuestion.assertCalls(1);
		spyAddText.assertArgument('fakeQuestion');

		spyGetAnswers.assertCalls(1);
		spyCreateChoice.assertArgument('answer1');
		spyCreateChoice.assertArgument('answer2');

		spyCreateButton.assertArgument('Previous question');
		spyCreateButton.assertArgument('Next question');
		spyCreateButton.assertCalls(2);

		spyAddText.assertArgument('message');
	})],
	() => {
		spyRemove.refresh();
	}
	).runTests();


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


