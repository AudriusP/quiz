var allQuestions = [];

$.getJSON("data.json", function(json) {
    allQuestions = json.allQuestions;
    setQuestion(currentQuestion);
});

var radioButtons = [
    document.getElementById("firstChoice"),
    document.getElementById("secondChoice"),
    document.getElementById("thirdChoice"),
    document.getElementById("fourthChoice")
];

var choicesContainers = [
    document.getElementById("firstChoiceContainer"),
    document.getElementById("secondChoiceContainer"),
    document.getElementById("thirdChoiceContainer"),
    document.getElementById("fourthChoiceContainer")
];

var questionContainer = document.getElementById("questionContainer");
var quizContainer = document.getElementById("quiz");
var finishContainer = document.getElementById("finish");
var userNameContainer = document.getElementById("userName");
var passwordContainer = document.getElementById("password");
var correctAnswers = 0;
var currentQuestion = 0;

function next() {
    if (isAnyChecked()){
        recordUserAnswer();
        if (isAnswerCorrect() && notYetAnsweredCorrectly()){
            userAnsweredCorrectly();
        }
        if(notLastQuestion()) {
            nextQuestion();
        }
        else{
            quizFinish("You answered " + correctAnswers + " questions correctly!");
        }
    }
    else {
        setInfoMessage("Choose answer!");
    }
}

function back() {
        if(notFirstQuestion()) {
            previousQuestion();
        }
        else{
            setInfoMessage("This is first question!");
        }
}

function setQuestion (id){
    questionContainer.innerHTML = allQuestions[id].question;
    setAnswers(id);

}

function setAnswers(id) {
    for (var i = 0; i < choicesContainers.length; i++) {
        choicesContainers[i].innerHTML = allQuestions[id].choices[i];
        if (allQuestions[id].userAnswer || allQuestions[id].userAnswer === 0) {
            radioButtons[allQuestions[id].userAnswer].checked = true;
        }
        else {
            radioButtons[i].checked = false;
        }
    }
}

function isAnyChecked (){
    for (var i = 0; i < radioButtons.length; i++){
        if(radioButtons[i].checked){
            setInfoMessage("");
            return true;
        }
    }
    return false;
}

function whichIsChecked (){
    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            return i;
        }
    }
}

function showData() {
    quizContainer.style.display = "block";
}

function login(){
    if(loginNotEmpty()) {
        if (newUser()) {
            setLocalStorage();
            setInfoMessage("Hello first time " + localStorage.getItem("userName"))
            showData();
            setCookie();
        }
        else if (registeredUser()) {
            setInfoMessage("Hello again " + localStorage.getItem("userName"));
            showData();
            setCookie();
        }
        else {
            setInfoMessage("User not found / Wrong user name or password")
        }
    }
    else {
        setInfoMessage("No data");
    }
}

function getCookie(cookieName) {
    var name = cookieName + "=";
    var splitCookie = document.cookie.split(';');
    for (var i = 0; i < splitCookie.length; i++){
        var currentCookie = splitCookie[i];
        if (currentCookie.charAt(0) === " "){
            currentCookie = currentCookie.substring(1);
        }
        if (currentCookie.indexOf(name) === 0){
            return currentCookie.substring(name.length);
        }
    }
    return "";
}

function checkCookie() {
    if (getCookie("username") !== ""){
        setInfoMessage("Welcome " + getCookie("username"));
    }
    else {
        setInfoMessage("Welcome, new user!");
    }
}

function isAnswerCorrect() {
    return radioButtons[allQuestions[currentQuestion].correctAnswer].checked;
}

function notYetAnsweredCorrectly() {
    return !(allQuestions[currentQuestion].alreadyAnswredCorrectly);
}

function recordUserAnswer() {
    allQuestions[currentQuestion].userAnswer = whichIsChecked();
}

function userAnsweredCorrectly() {
    correctAnswers++;
    allQuestions[currentQuestion].alreadyAnswredCorrectly = true;
}

function nextQuestion() {
    currentQuestion++;
    setQuestion(currentQuestion);
}

function quizFinish(message) {
    setInfoMessage(message);
    quizContainer.remove();
}

function notLastQuestion() {
    return currentQuestion !== (allQuestions.length - 1);
}

function notFirstQuestion() {
    return currentQuestion !== 0;
}

function previousQuestion() {
    currentQuestion--;
    setQuestion(currentQuestion);
}

function loginNotEmpty() {
    return userNameContainer.value && passwordContainer.value;
}

function newUser() {
    return !(localStorage.getItem("userName")) && !(localStorage.getItem("password"));
}

function setLocalStorage() {
    localStorage.setItem("userName", userNameContainer.value);
    localStorage.setItem("password", passwordContainer.value);
}

function setCookie() {
    document.cookie = "username=" + userNameContainer.value;
}

function registeredUser() {
    return localStorage.getItem("userName") === userNameContainer.value && localStorage.getItem("password") === passwordContainer.value;
}

function setInfoMessage(message){
    finishContainer.innerHTML = message;
}