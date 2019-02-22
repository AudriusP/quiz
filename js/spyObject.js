const Spy = require('./spy.js');

function spyObject(spies) {
	const spiesObj = {};

	for(let i = 0; i < spies.length; i++) {
		spiesObj[spies[i]] = new Spy();
	}

	return spiesObj;
}

module.exports = spyObject;
