function Spy(){
	this.calls = 0;

	function logCall() {
		calls++;
	}

	function assertCalled(callsNumber) {
		if(calls !== callsNumber) {
			throw Error('Spy was not called ' + callsNumber + ', but ' + calls + ' times!');
		}
	}
	return {
		logCall,
		assertCalled
	}
}

module.exports = Spy;
