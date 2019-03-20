function Canvas(enterElementId) {
	let canvas;
	let canvasRows = 0;

	function addContainer(elements) {
		const enterElement = getEl(enterElementId);
		enterElement.appendChild(canvas);
	}

	function addText(text) {
		canvasRows++;
		const ctx = canvas.getContext('2d');
		ctx.font = '15px Arial';
		ctx.fillText(text, 10, 20 * canvasRows);
	}

	function createChoice(text, index, userAnswer, onChangeCallback) {
		createChoiceContainer(text, userAnswer === index, onChangeCallback);
	}

	function createButton(text, fnc) {
		canvasRows++;
		const buttonX = 0;
		const buttonY = 20 * canvasRows - 15;
		const ctx = canvas.getContext('2d');

		ctx.rect(buttonX, buttonY, 150, 20);
		ctx.stroke();

		ctx.font = '15px Arial';
		ctx.fillText(text, 10, 20 * canvasRows);

		canvas.addEventListener('click', (e) => {
			const pos = {
				x: e.clientX,
				y: e.clientY
			}

			if (pos.x >= buttonX && pos.x <= buttonX + 150 &&
				pos.y >= buttonY && pos.y <= buttonY + 20) {
				fnc();
		}
	});
	}

	function clear() {
		document.getElementById(enterElementId).innerHTML = '';
		canvasRows = 0;
		canvas = create('canvas', {id: 'container', height: 500, style: 'display:block'}, []);
	}

	function createChoiceContainer(text, isChecked, onChangeCallback) {
		canvasRows++;
		const currentCanvasRows = canvasRows;
		const containerX = 0;
		const containerY = 20 * canvasRows - 7;
		const ctx = canvas.getContext('2d');

		ctx.beginPath();
		ctx.arc(10, 20 * canvasRows- 5, 5, 0, 2 * Math.PI);
		ctx.stroke();

		ctx.font = '15px Arial';
		ctx.fillText(text, 20, 20 * canvasRows);

		if(isChecked) {
			ctx.beginPath();
			ctx.arc(10, 20 * currentCanvasRows - 5, 2, 0, 2 * Math.PI);
			ctx.stroke();
		}

		canvas.addEventListener('click', (e) => {
			const pos = {
				x: e.clientX,
				y: e.clientY
			}

			if (pos.x >= containerX && pos.x <= containerX + 150 &&
				pos.y >= containerY && pos.y <= containerY + 15) {
				onChangeCallback(text);
			const ctx = canvas.getContext('2d');
			ctx.beginPath();
			ctx.arc(10, 20 * currentCanvasRows - 5, 2, 0, 2 * Math.PI);
			ctx.stroke();
		}
	});
	}

	return {
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

function getEl(elementId) {
	return document.getElementById(elementId);
}

module.exports = Canvas;
