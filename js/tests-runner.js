function Suite(suiteName, tests, beforeEach, afterEach) {
	function runTests() {
		let passed = 0;
		let failed = 0;

		tests.forEach(([testName, testFn]) => {
			const name = suiteName + ' ' + testName;

			if(beforeEach) {
				beforeEach();
			}

			let ok = true;
			try {
				testFn();
			} catch (e) {
				ok = false;
				console.log('\x1b[31m', 'Failed: "' + name + '"" because of: ' + e);
				failed++;
			}
			if(ok) {
				console.log('\x1b[32m', 'Passed: "' + name + '"');
				passed++;
			}

			if(afterEach) {
				afterEach();
			}
		});

		console.log('\x1b[32m', 'Passed: ' + passed + ' tests');
		if(failed > 0) {
			console.log('\x1b[31m', 'Failed: ' + failed + ' tests');
		}
		console.log('\x1b[0m');
	}
	return {
		runTests
	}
}

function test(name, testFn) {
	return[name, testFn];
}

module.exports = { 
	Suite: Suite,
	test: test,
};
