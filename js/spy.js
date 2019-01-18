function Spy() {
	this.calls = 0;
	this.args = [];

	this.log = function (args) {
		this.calls++;
		if(args) {
			this.args = Array.from(args);
		} else {
			this.args = [];
		}
	}

	this.assertCalls = function (callsNumber) {
		if(this.calls !== callsNumber) {
			throw Error('Spy was not called ' + callsNumber + ', but ' + this.calls + ' times!');
		}
	}

	this.assertArgument = function (argIndex, argumentValue) {
		if(this.args[argIndex] !== argumentValue) {
			throw Error('Spied function was not called with value \"' + argumentValue + '\" as ' + argIndex + ' argument!\n' +
				'But instead with value \"' + this.args[argIndex] + '\"...');
		}
	}
}

module.exports = Spy;
