function HTML(enterElementId) {

	function addContainer(elements) {
		const enterElement = getEl(enterElementId);
		const element = create('div', {}, []);
		enterElement.appendChild(element);

		for (let i = 0; i < elements.length; i++) {
			element.appendChild(elements[i]);
		}
	}

	function addText(text) {
		return create('p', {}, [createText(text)]);
	}

	function createChoice(text, index, userAnswer, onChangeCallback) {
		return createChoiceContainer(text, userAnswer === index, onChangeCallback);
	}

	function createButton(text, fnc) {
		return create('button', {onclick: fnc}, [createText(text)]);
	}

	function clear() {
		document.getElementById(enterElementId).innerHTML = '';
	}

	return{
		addContainer,
		addText,
		createChoice,
		createButton,
		clear
	}
}


function createChoiceContainer(text, isChecked, onChangeCallback) {
	return create('p', {}, [
		create('input', {name: 'answer', type: 'radio', id: text, checked: isChecked, onchange: () => {onChangeCallback(text)}}),
		create('label', {htmlFor: text}, [createText(text)])
		]);
}

function create(elementType, attributes, children) {
	const element = document.createElement(elementType);

	for(let key in attributes) {
		element[key] = attributes[key];
	}

	if(children) {
		for(let i = 0; i < children.length; i++) {
			element.appendChild(children[i]);
		}
	}

	return element;
}

function createText(text) {
	return document.createTextNode(text);
}

function getEl(elementId) {
	return document.getElementById(elementId);
}

module.exports = HTML;
