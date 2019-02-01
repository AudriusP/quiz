//tape test runner - check insides
//node script to run *.test.js

const Quiz = require('./quiz');
const TR = require('./tests-runner');
const Spy = require('./spy');
const tr = require('../testsRunner/testRunner');

function fakeGetJSON(json) {
	return (url, callback) => callback(json);
}

const spyRender = new Spy();

const fakeUI ={
	render() {
		spyRender.log(arguments);
	}
}
/*
tr().describe('Quiz.run()', function() {
	tr().beforeEach(function() {
	    spyRender.refresh();
	  });

	tr().it('should work with empty JSON', function() {
		Quiz(fakeUI, fakeGetJSON({questions: []})).run();
		spyRender.assertCalls(1);
	});
	tr().it('should work with real JSON', function() {
		Quiz(fakeUI, fakeGetJSON({questions: []})).run();
		spyRender.assertCalls(1);
	});
	tr().it('should pass correct parameter to UI.render()', function() {
		Quiz(fakeUI, fakeGetJSON({questions: []})).run();
		spyRender.assertCalls(1);
	});
});
*/
TR.Suite([
	TR.test('Quiz.run() should work with empty JSON', () => {
		Quiz(fakeUI, fakeGetJSON({questions: []})).run();
		spyRender.assertCalls(1);
	}),
	TR.test('Quiz.run() should work with real JSON', () => {
		Quiz(fakeUI, fakeGetJSON(require('../data/data.json'))).run();
		spyRender.assertCalls(1);
	})
],
	() => { spyRender.refresh(); }
).runTests();
