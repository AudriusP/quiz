function UIBackend(renderer) {
	function addContainer(elements) {
		renderer.addContainer(elements);
	}

	function createText(text) {
		return renderer.addText(text);
	}
// userAnswer -> isChecked?
// Callback on select?
	function createChoice(text, userAnswer) {
		return renderer.createChoice(text, userAnswer);
	}

	function createButton(text, fnc) {
		return renderer.createButton(text, fnc);
	}

	function clear() {
		renderer.clear();
	}

	function whichIsChecked() {
		return renderer.whichIsChecked();
	}

	function setInfoMessage(text) {
		renderer.setInfoMessage(text);
	}

	return {
		addContainer,
		createText,
		createChoice,
		createButton,
		clear,
		whichIsChecked,
		setInfoMessage
	}
}

module.exports = UIBackend;