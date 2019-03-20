const QuizApp = require('./quiz');
const {Suite, test} = require('./tests-runner');
const Spy = require('./spy');

function fakeGetJSON(json) {
	return (url, callback) => callback(json);
}

const spyRender = new Spy();

const fakeUI ={
	render() {
		spyRender.log(arguments);
	}
}

Suite('QuizApp.run()', [
	test('should work with empty JSON', () => {
		QuizApp(fakeUI, fakeGetJSON({questions: [{question: '', answers: [], correctAnswer: ''}]})).run();
		spyRender.assertCalls(1);
	}),
	test('should work with real JSON', () => {
		QuizApp(fakeUI, fakeGetJSON(require('../data/data.json'))).run();
		spyRender.assertCalls(1);
	})
],
	() => { spyRender.refresh(); }
).runTests();
