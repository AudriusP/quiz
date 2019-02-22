const {Suite, test} = require('./tests-runner');
const assert = require('assert');
const Quiz = require('./model');
const Question = require('./question');


Suite('Question', [
	test('has title', () => {
		assert.equal(
			Question('this is a question').getQuestion(),
			'this is a question'
		);
	}),
	test('has answers', () => {
		assert.deepEqual(
			Question(null, [1, 2, 3]).getAnswers(),
			[1, 2, 3]
		);
	}),
	test('knows correct answer', () => {
		assert.equal(
			Question(null, ['a', 'b'], 'b').getCorrectAnswer(),
			'b'
		);
	}),
]).runTests()

Suite('Quiz', [
	test('should know questions that it was given', () => {
		const questions = [Question()];
		assert.deepEqual(Quiz(questions).getQuestions(), questions);
	}),
	test('should not crash when getting current question if there are none', () => {
		Quiz().getCurrentQuestion();
	}),
	test('should start with first question as current', () => {
		const questions = [Question('A'), Question('B')];
		assert.equal(
			Quiz(questions).getCurrentQuestion().getQuestion(),
			'A'
		);
	}),
	test('can advance', () => {
		const questions = [Question('A'), Question('B')];
		const quiz = Quiz(questions).advance();
		assert.equal(
			quiz.getCurrentQuestion().getQuestion(),
			'B'
		);
	}),
]).runTests()