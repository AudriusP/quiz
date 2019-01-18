function Suite(tests) {
	function runTests() {
		let passed = 0;
		let failed = 0;

		tests.forEach(([name, testFn]) => {
			let ok = true;
			try {
				testFn();
			} catch (e) {
				ok = false;
				console.log('Failed: "' + name + '"" because of: ' + e);
				failed++;
			}
			if(ok) {
				console.log('Passed: "' + name + '"');
				passed++;
			}
		});

		console.log('Passed: ' + passed + ' tests');
		console.log('Failed: ' + failed + ' tests');
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
