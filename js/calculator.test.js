const {Suite, test} = require('./tests-runner');
const assert = require('assert');
const Question = require('./question');
const {getCorrectAnswersCount} = require('./calculator');

Suite('getCorrectAnswersCount', [
	test('should return 0 correct answers count for empty question', () => {
		assert.equal(
			getCorrectAnswersCount(),
			0
		);
	}),
	test('should return 1 correct answer for one question with one correct answer', () => {
		assert.equal(
			getCorrectAnswersCount([Question('A', ['a'], 'a')], ['a']),
			1,
			'correct answer count is not 1'
		);
		assert.equal(
			getCorrectAnswersCount([Question('A', ['a'], 'a')], ['b']),
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
			getCorrectAnswersCount(questions, ['a', 'b', 'a']),
			2
		);
	})
]).runTests()