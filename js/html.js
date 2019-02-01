function HTML(enterElementId) {
	const choicesIds = [];

	function addContainer(elements) {
		const enterElement = getEl(enterElementId);
		const element = create('div', {id: 'quiz'}, []);
		enterElement.appendChild(element);

		for (let i = 0; i < elements.length; i++) {
			element.appendChild(elements[i]);
		}
	}

	function addText(text) {
		return create('div', {}, [createText(text)]);
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
		return create('button', {onclick: fnc}, [createText(text)]);
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
		getEl(enterElementId).appendChild(create('div', {id: 'infoMessage'}, [createText(text)]));
	}

	return{
		addContainer,
		addText,
		createChoice,
		createButton,
		clear,
		whichIsChecked,
		setInfoMessage
	}
}
/*
function createChoices(choicesNumber) {
	const choicesContainer = create('p');
	choicesIds = [];
	for (let i = 0; i < choicesNumber; i++) {
		choicesIds.push('choice' + i);
		choicesContainer.appendChild(createChoiceContainer(choicesIds[i]));
	}
	return choicesContainer;
}
*/
function createChoiceContainer(text, isChecked) {
	return create('p', {}, [
		create('input', {name: 'answer', type: 'radio', id: text, checked: isChecked}),
		create('label', {htmlFor: text}, [createText(text)])
		]);
}
/*
function setQuestion(Question, userAnswer) {
	document.getElementById('questionContainer').innerHTML = Question.getQuestion();
	setAnswers(Question.getAnswers(), userAnswer);
}

function setAnswers(answers, userAnswer) {
	for (let i = 0; i < choicesIds.length; i++) {
		getEl(choicesIds[i]).parentNode.getElementsByTagName('label')[0].innerHTML = answers[i];
		if (userAnswer !== undefined) {
			getEl(choicesIds[userAnswer]).checked = true;
		}
		else {
			getEl(choicesIds[i]).checked = false;
		}
	}
}
*/

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

function createText(text) {
	return document.createTextNode(text);
}

function getEl(elementId) {
	return document.getElementById(elementId);
}

module.exports = HTML;
