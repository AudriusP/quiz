function Spy() {
	this.calls = 0;
	this.args = [];

	this.log = function (args) {
		this.calls++;
		if(args) {
			this.args = this.args.concat(Array.from(args));
		}
	}

	this.assertCalls = function (callsNumber) {
		if(this.calls !== callsNumber) {
			throw Error('Spy was not called ' + callsNumber + ', but ' + this.calls + ' times!');
		}
	}

	this.assertArgument = function (argumentValue) {
		if(this.args.indexOf(argumentValue) === -1) {
			throw Error('Spied function was not called with value \"' + argumentValue + '\"!');
		}
	}

	this.refresh = function () {
		this.calls = 0;
		this.args = [];
	}
}

module.exports = Spy;
