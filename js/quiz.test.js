//Improve custom test runner
//Suite -> ui.test.js
//tape test runner - check insides
//Separete UI?
//Spy -> what params? render() -> with first q

const Quiz = require('./quiz');
const TR = require('./tests-runner');
const Spy = require('./spy');

function fakeGetJSON(json) {
	return (url, callback) => callback(json);
}

const renderSpy = new Spy();

const fakeUI ={
	render() {
		renderSpy.log(arguments);
	}
}

TR.Suite([
	TR.test('Quiz.run() should work with empty JSON', () => {
		Quiz(fakeUI, fakeGetJSON({questions: []})).run();
		renderSpy.assertCalls(1);
	}),
	TR.test('Quiz.run() should work with real JSON', () => {
		Quiz(fakeUI, fakeGetJSON(require('../data/data.json'))).run();
		renderSpy.assertCalls(2);
	}),
	TR.test('Quiz.run() should pass correct parameter to UI.render()', () => {
		Quiz(fakeUI, fakeGetJSON({questions: []})).run('app');
		renderSpy.assertCalls(3);
		renderSpy.assertArgument('app');
	})
]).runTests();
