//Improve custom test runner
//Suite -> ui.test.js
//tape test runner - check insides
//Separete UI?
//Spy -> what params? render() -> with first q

const Quiz = require('./quiz');
const TR = require('./tests-runner');
const Spy = require('./spies');

function fakeGetJSON(json) {
	return (url, callback) => callback(json);
}

const renderSpy = Spy();

const fakeUI ={
	render() {
		renderSpy.logCall();
	}
}

TR.Suite([
	TR.test('Quiz.run() should work with empty JSON', () => {
		Quiz(fakeUI, fakeGetJSON({questions: []})).run();
		renderSpy.assertCalled(1);
	}),
	TR.test('Quiz.run() should work with real JSON', () => {
		Quiz(fakeUI, fakeGetJSON(require('../data/data.json'))).run();
		renderSpy.assertCalled(2);
	})
]).runTests();
