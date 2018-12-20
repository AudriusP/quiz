const assert = require('assert');
const Quiz = require('./quiz');
const UI = require('./ui');

function fakeGetJSON(json) {
	return (url, callback) => callback(json);
}

const fakeUI ={
	render() {}
}

const fakeDocument = {
	getElementById() {
		return {
			remove() {}
		} },
	createElement() {

	}
}

Quiz(fakeUI, fakeGetJSON({questions: []})).run();

Quiz(fakeUI, fakeGetJSON(require('../data/data.json'))).run();

//UI(fakeDocument).render();

//setQuestion,
//clearQuiz

UI(fakeDocument).setInfoMessage('Test message');

assert.strictEqual(UI(fakeDocument).whichIsChecked(), -1, 'should return -1 for no checked answers');