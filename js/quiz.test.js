const QuizApp = require('./quiz');
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

describe('QuizApp.run()', function() {
    it('should work with empty JSON', function() {
      QuizApp(fakeUI, fakeGetJSON({questions: [{question: '', answers: [], correctAnswer: ''}]})).run();
		spyRender.assertCalls(1);
    });
    it('should work with real JSON', function() {
		QuizApp(fakeUI, fakeGetJSON(require('../data/data.json'))).run();
		spyRender.assertCalls(2);
    });
});

