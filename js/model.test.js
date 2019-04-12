const assert = require('assert');
const Quiz = require('./model');
const Question = require('./question');

describe('Question', function() {
	it('has title', function() {
		assert.equal(
			Question('this is a question').getQuestion(),
			'this is a question'
			);
	});
	it('has answers', function() {
		assert.deepEqual(
			Question(null, [1, 2, 3]).getAnswers(),
			[1, 2, 3]
			);
	});
	it('knows correct answer', function() {
		assert.equal(
			Question(null, ['a', 'b'], 'b').getCorrectAnswer(),
			'b'
			);
	});
});

describe('Quiz', function() {
	it('should not crash when getting current question if there is none', function() {
		Quiz().getCurrentQuestion();
	});
	it('should start with first question as current', function() {
		const questions = [Question('A'), Question('B')];
		assert.equal(
			Quiz(questions).getCurrentQuestion().getQuestion(),
			'A'
			);
	});
	it('should be able to set user answer', function() {
		const questions = [Question('A', ['a', 'b'])];
		let quiz = Quiz(questions, 0);
		quiz = quiz.setUserAnswer('a')
		assert.equal(
			quiz.getUserAnswer(),
			'a'
			);
	});
	it('should not set invalid user answer', function() {
		const questions = [Question('A', ['a', 'b'])];
		let quiz = Quiz(questions, 0);
		quiz = quiz.setUserAnswer('c')
		assert.equal(
			quiz.getUserAnswer(),
			undefined
			);
	});
	it('should not crash when getting user answer if there is none', function() {
		const questions = [Question('A', [])];
		Quiz(questions).getUserAnswer();
	});
	it('should get correct user answer', function() {
		const questions = [Question('A', ['a', 'b']), Question('B', ['b', 'a'])];
		const quiz = Quiz(questions, 1, ['a', 'b']);
		assert.equal(
			quiz.getUserAnswer(),
			'b'
			);
	});
	it('should not crash when getting message code if there is none', function() {
		Quiz().getMessageCode();
	});
	it('should be able to get message code', function() {
		const quiz = Quiz([], 0, [], 0);
		assert.equal(
			quiz.getMessageCode(),
			0
			);
	});
	it('should not advance and should show error if user not answered', function() {
		const questions = [Question('A'), Question('B')];
		const quiz = Quiz(questions, 0, []).advance();
		assert.equal(
			quiz.getCurrentQuestion().getQuestion(),
			'A'
			);
		assert.equal(
			quiz.getMessageCode(),
			1
			);
	});
	it('should not advance and should show answers count if last question', function() {
		const questions = [Question('A'), Question('B')];
		const quiz = Quiz(questions, 1, ['a', 'b']).advance();
		assert.equal(
			quiz.getCurrentQuestion().getQuestion(),
			'B'
			);
		assert.equal(
			quiz.getMessageCode(),
			3
			);
	});
	it('can advance', function() {
		const questions = [Question('A'), Question('B')];
		const quiz = Quiz(questions, 0, ['a']).advance();
		assert.equal(
			quiz.getCurrentQuestion().getQuestion(),
			'B'
			);
	});
	it('should not regress and should show error if first question', function() {
		const questions = [Question('A')];
		const quiz = Quiz(questions, 0).regress();
		assert.equal(
			quiz.getCurrentQuestion().getQuestion(),
			'A'
			);
		assert.equal(
			quiz.getMessageCode(),
			2
			);
	});
	it('can regress', function() {
		const questions = [Question('A'), Question('B')];
		const quiz = Quiz(questions, 1).regress();
		assert.equal(
			quiz.getCurrentQuestion().getQuestion(),
			'A'
			);
	});
});
