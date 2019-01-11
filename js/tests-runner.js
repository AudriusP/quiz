const tests = [];
const spies = {};

function TR() {
	function test(name, testFn) {
		tests.push([name, testFn]);
	}

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

	function logToSpy(spyName) {
		if(!spies[spyName]) {
			spies[spyName] = 1;
		} else {
			spies[spyName]++;
		}
	}

	function assertSpy(spyName, callsNumber) {
		if(spies[spyName] !== callsNumber) {
			throw Error(spyName + '() was not called ' + callsNumber + ', but ' + spies[spyName] + ' times!');
		}
	}

	return {
		test,
		runTests,
		logToSpy,
		assertSpy
	}
}

module.exports = TR;