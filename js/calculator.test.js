const assert = require('assert');
const Question = require('./question');
const {getCorrectAnswersCount} = require('./calculator');

describe('getCorrectAnswersCount', function() {
	it('should return 0 correct answers count for empty question', function() {
		assert.equal(
			getCorrectAnswersCount(),
			0
			);
	});
	it('should return 1 correct answer for one question with one correct answer', function() {
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
	});
	it('should return 2 correct answer count for 2 correct and 1 incorrect answers', function() {
		const questions = [
		Question('A', ['a', 'b'], 'a'),
		Question('B', ['a', 'b'], 'a'),
		Question('C', ['a', 'b'], 'a'),
		];
		assert.equal(
			getCorrectAnswersCount(questions, ['a', 'b', 'a']),
			2
			);
	});
});