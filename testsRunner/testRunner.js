function TR() {
	let beforeEachFN;

	function describe(name, fn) {
		console.log(name);
		fn();
	}

	function it(name, fn) {
		if(beforeEachFN) {
			beforeEachFN();
		}

		console.log('\t' + name);

		try{
			fn();
		}
		catch(e) {
			console.log('\x1b[31m', 'Failed: "' + name + '"" because of: ' + e);
		}
		
	}

	function beforeEach(fn) {
		beforeEachFN = fn;
	}

	return {
		describe: describe,
		it: it,
		beforeEach: beforeEach
	}
}

module.exports = TR;