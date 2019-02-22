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
	test('should know current question id', () => {
		assert.equal(
			Quiz([], 1).getCurrentQuestionId(),
			1
		);
	}),
	test('should be able to set and get user answer', () => {
		const quiz = Quiz();
		quiz.setUserAnswer(0)
		assert.equal(
			quiz.getUserAnswer(),
			0
		);
	}),
	test('should get current question user answer by default', () => {
		assert.equal(
			Quiz([], 1, ['a', 'b']).getUserAnswer(),
			'b'
		);
	}),
	test('should get correct question user answer', () => {
		assert.equal(
			Quiz([], 0, ['a', 'b', 'c']).getUserAnswer(2),
			'c'
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
	test('can regress', () => {
		const questions = [Question('A'), Question('B')];
		const quiz = Quiz(questions, 1).regress();
		assert.equal(
			quiz.getCurrentQuestion().getQuestion(),
			'A'
		);
	}),
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
]).runTests()

