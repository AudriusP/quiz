function UIBackend(renderer) {
	function addContainer(elements) {
		renderer.addContainer(elements);
	}

	function createText(text) {
		return renderer.addText(text);
	}

	function createChoice(text, isChecked, onChangeCallback) {
		return renderer.createChoice(text, isChecked, onChangeCallback);
	}

	function createButton(text, fnc) {
		return renderer.createButton(text, fnc);
	}

	function clear() {
		renderer.clear();
	}

	return {
		addContainer,
		createText,
		createChoice,
		createButton,
		clear
	}
}

module.exports = UIBackend;
