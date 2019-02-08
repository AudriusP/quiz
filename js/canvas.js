function Canvas(enterElementId) {
	const choicesIds = [];

	function addContainer(elements) {
		const enterElement = getEl(enterElementId);

		for (let i = 0; i < elements.length; i++) {
			enterElement.appendChild(elements[i]);
		}
	}

	function addText(text) {
		const canvas = create('canvas', {id: 'text', height: 25, style: 'display:block'}, []);
		const ctx = canvas.getContext('2d');
		ctx.font = '15px Arial';
		ctx.fillText(text, 10, 15);
		return canvas;
	}

	function createChoice(text, userAnswer) {
		let isChecked = false;

		if(userAnswer === choicesIds.length) {
			isChecked = true;
		}
		
		choicesIds.push(text);
		return createChoiceContainer(text, isChecked);
	}

	function createButton(text, fnc) {
		const button = create('canvas', {id: 'button', width: 150, height: 20, onclick: fnc}, []);

		var ctx = button.getContext('2d');
		ctx.rect(0, 0, 150, 20);
		ctx.stroke();

		ctx.font = '15px Arial';
		ctx.fillText(text, 10, 15);
		return button;
	}

	function clear() {
		clearQuiz();
		clearInfoMessage();
		choicesIds.length = 0;
	}

	function whichIsChecked() {
		for (let i = 0; i < choicesIds.length; i++) {
			if (getEl(choicesIds[i]).checked) {
				setInfoMessage('');
				return i;
			}
		}
		return -1;
	}

	function setInfoMessage(text) {
		clearInfoMessage();
		const canvas = create('canvas', {id: 'infoMessage', height: 25, style: 'display:block'}, []);
		const ctx = canvas.getContext('2d');
		ctx.font = '15px Arial';
		ctx.fillText(text, 10, 15);

		getEl(enterElementId).appendChild(canvas);
	}

	function createChoiceContainer(text, isChecked) {
		const choice = create('canvas', {id: text, height: 25, style: 'display:block', onclick: () => {checkChoice(text)}}, []);
		choice.setAttribute('data-checked', isChecked);
		const ctx = choice.getContext('2d');

		ctx.beginPath();
		ctx.arc(10, 10, 5, 0, 2 * Math.PI);
		ctx.stroke();

		ctx.font = '15px Arial';
		ctx.fillText(text, 20, 15);
		return choice;
	}

	function checkChoice(text) {
		for (let i = 0; i < choicesIds.length; i++) {
			const choice = getEl(choicesIds[i]);
			const ctx = choice.getContext('2d');
			ctx.lineWidth = '2';
			ctx.strokeStyle = 'white';
			ctx.beginPath();
			ctx.arc(10, 10, 2, 0, 2 * Math.PI);
			ctx.stroke();
			choice.setAttribute('data-checked', false);
		}

		const choice = getEl(text);
		const ctx = choice.getContext('2d');
		ctx.lineWidth = '1';
		ctx.strokeStyle = 'black';
		ctx.beginPath();
		ctx.arc(10, 10, 2, 0, 2 * Math.PI);
		ctx.stroke();
		choice.setAttribute('data-checked', true);
	}

	return {
		addContainer,
		addText,
		createChoice,
		createButton,
		clear,
		whichIsChecked,
		setInfoMessage
	}
}

function clearQuiz() {
	if(getEl('quiz')) {
		getEl('quiz').remove();
	}
}

function clearInfoMessage() {
	if(getEl('infoMessage')) {
		getEl('infoMessage').remove();
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

function getEl(elementId) {
	return document.getElementById(elementId);
}

module.exports = Canvas;
