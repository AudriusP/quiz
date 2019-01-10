//Custom spy to check if methods were called

const Quiz = require('./quiz');
const UI = require('./ui');
const TR = require('./tests-runner');

function fakeGetJSON(json) {
	return (url, callback) => callback(json);
}

const fakeUI ={
	render() {
		TR().logToSpy('render');
	}
}

const fakeDocument = {
	getElementById() {
		return fakeElement;
	},
	getElementsByTagName() {
		return [fakeElement];
	},
	createElement() {
		return fakeElement;
	},
	createTextNode() {}
}

const fakeElement = {
	appendChild() {},
	remove() {},
	parentNode: fakeDocument
}

const fakeQuestion = {
	getQuestion() {},
	getAnswers() {
		return [];
	}
}

TR().test('Quiz.run() should work with empty JSON', () => {
	Quiz(fakeUI, fakeGetJSON({questions: []})).run();
	TR().assertSpy('render', 1);
});

TR().test('Quiz.run() should work with real JSON', () => {
	Quiz(fakeUI, fakeGetJSON(require('../data/data.json'))).run();
	TR().assertSpy('render', 2);
});

TR().test('UI.setQuestion() should work with fakeQuestion', () => {
	UI(fakeDocument).setQuestion(fakeQuestion);
});

TR().test('UI.clearQuiz() should work', () => {
	UI(fakeDocument).clearQuiz();
});

TR().test('UI.setInfoMessage() should work', () => {
	UI(fakeDocument).setInfoMessage('Test message');
});

TR().test('UI.whichIsChecked() should return -1 for no checked answers', () => {
	assert.strictEqual(UI(fakeDocument).whichIsChecked(), -1, 'should return -1 for no checked answers');
});

TR().test('UI.render() should work', () => {
	UI(fakeDocument).render('enterElement', () => {}, () => {}, fakeQuestion);
});

TR().runTests();