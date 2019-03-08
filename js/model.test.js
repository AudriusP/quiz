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
	test('should not crash when getting current question if there is none', () => {
		Quiz().getCurrentQuestion();
	}),
	test('should start with first question as current', () => {
		const questions = [Question('A'), Question('B')];
		assert.equal(
			Quiz(questions).getCurrentQuestion().getQuestion(),
			'A'
		);
	}),
	test('should be able to set user answer', () => {
		const questions = [Question('A', ['a', 'b'])];
		let quiz = Quiz(questions, 0);
		quiz = quiz.setUserAnswer('a')
		assert.equal(
			quiz.getUserAnswerId(),
			0
		);
	}),
	test('should not crash when getting user answer id if there is none', () => {
		const questions = [Question('A', [])];
		Quiz(questions).getUserAnswerId();
	}),
	test('should get correct user answer id', () => {
		const questions = [Question('A', ['a', 'b']), Question('B', ['b', 'a'])];
		const quiz = Quiz(questions, 1, ['a', 'b']);
		assert.equal(
			quiz.getUserAnswerId(),
			0
			)
	}),
	test('should not crash when getting message if there is none', () => {
		Quiz().getMessage();
	}),
	test('should be able to get message', () => {
		const quiz = Quiz([], 0, [], 'message');
		assert.equal(
			quiz.getMessage(),
			'message'
			);
	}),
	test('should not advance and should show error if user not answered', () => {
		const questions = [Question('A'), Question('B')];
		const quiz = Quiz(questions, 0, []).advance();
		assert.equal(
			quiz.getCurrentQuestion().getQuestion(),
			'A'
			);
		assert.equal(
			quiz.getMessage(),
			'Choose answer!'
			);
	}),
	test('should not advance and should show error if last question', () => {
		const questions = [Question('A'), Question('B')];
		const quiz = Quiz(questions, 1, ['a', 'b']).advance();
		assert.equal(
			quiz.getCurrentQuestion().getQuestion(),
			'B'
			);
		assert.equal(
			quiz.getMessage(),
			'You answered 0 questions correctly!'
			);
	}),
	test('can advance', () => {
		const questions = [Question('A'), Question('B')];
		const quiz = Quiz(questions, 0, ['a']).advance();
		assert.equal(
			quiz.getCurrentQuestion().getQuestion(),
			'B'
		);
	}),
	test('should not regress and should show error if first question', () => {
		const questions = [Question('A')];
		const quiz = Quiz(questions, 0).regress();
		assert.equal(
			quiz.getCurrentQuestion().getQuestion(),
			'A'
			);
		assert.equal(
			quiz.getMessage(),
			'This is first question!'
			);
	}),
	test('can regress', () => {
		const questions = [Question('A'), Question('B')];
		const quiz = Quiz(questions, 1).regress();
		assert.equal(
			quiz.getCurrentQuestion().getQuestion(),
			'A'
		);
	}),
	/*
	test('should return 0 correct answers count for empty question', () => {
		assert.equal(
			Quiz().getCorrectAnswersCount(),
			0
		);
	}),
	test('should return 1 correct answer for one question with one correct answer', () => {
		assert.equal(
			Quiz([Question('A', ['a'], 'a')], 0, ['a']).getCorrectAnswersCount(),
			1,
			'correct answer count is not 1'
		);
		assert.equal(
			Quiz([Question('A', ['a'], 'a')], 0, ['b']).getCorrectAnswersCount(),
			0,
			'correct answer count is not 0'
		);
	}),
	test('should return 2 correct answer count for 2 correct and 1 incorrect answers', () => {
		const questions = [
			Question('A', ['a', 'b'], 'a'),
			Question('B', ['a', 'b'], 'a'),
			Question('C', ['a', 'b'], 'a'),
		];
		assert.equal(
			Quiz(questions, 0, ['a', 'b', 'a']).getCorrectAnswersCount(),
			2
		);
	})
	*/
]).runTests()

