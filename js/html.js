function HTML(enterElementId) {
	let containers = [];
	const enterElement = getEl(enterElementId);
	const date = new Date();
	const uniqueId = date.getTime();

	function addContainer(elements) {
		const element = create('div', {}, []);
		enterElement.appendChild(element);
		containers.push(element);

		for (let i = 0; i < elements.length; i++) {
			element.appendChild(elements[i]);
		}
	}

	function addText(text) {
		return create('p', {}, [createText(text)]);
	}

	function createChoice(text, isChecked, onChangeCallback) {
		return create('p', {}, [
		create('input', {name: 'answer' + uniqueId, type: 'radio', id: text + uniqueId, checked: isChecked, onchange: () => {onChangeCallback(text)}}),
		create('label', {htmlFor: text + uniqueId}, [createText(text)])
		]);
	}

	function createButton(text, fnc) {
		return create('button', {onclick: fnc}, [createText(text)]);
	}

	function clear() {
		if(containers.length > 0) {
			containers.forEach(function(container) {
				enterElement.removeChild(container);
			})
			containers = [];
		}
	}

	return{
		addContainer,
		addText,
		createChoice,
		createButton,
		clear
	}
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
