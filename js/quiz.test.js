//Improve custom test runner
//Suite -> ui.test.js
//tape test runner - check insides
//Spy -> what params? render() -> with first q
//Separete UI?
//node script to run *.test.js

const Quiz = require('./quiz');
const TR = require('./tests-runner');
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

TR.Suite([
	TR.test('Quiz.run() should work with empty JSON', () => {
		Quiz(fakeUI, fakeGetJSON({questions: []})).run();
		spyRender.assertCalls(1);
	}),
	TR.test('Quiz.run() should work with real JSON', () => {
		Quiz(fakeUI, fakeGetJSON(require('../data/data.json'))).run();
		spyRender.assertCalls(1);
	}),
	TR.test('Quiz.run() should pass correct parameter to UI.render()', () => {
		Quiz(fakeUI, fakeGetJSON({questions: []})).run('app');
		spyRender.assertCalls(1);
		spyRender.assertArgument('app');
	})
],
	() => { spyRender.refresh(); }
).runTests();
