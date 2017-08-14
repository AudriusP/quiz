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
            quizFinish();
        }
    }
    else {
        answerNotChosen();
    }
}

function back() {
        if(notFirstQuestion()) {
            previousQuestion();
        }
        else{
            noMorePreviousQuestions();
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
            finishContainer.innerHTML = "";
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
            loggedInFirstTimeGreeting();
            showData();
            setCookie();
        }
        else if (registeredUser()) {
            loggedInAgainGreeting();
            showData();
            setCookie();
        }
        else {
            userNotFound();
        }
    }
    else {
        loginFieldsEmpty();
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
        finishContainer.innerHTML = ("Welcome " + getCookie("username"));
    }
    else {
        finishContainer.innerHTML = ("Welcome, new user!");
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

function quizFinish() {
    finishContainer.innerHTML = ("You answered " + correctAnswers + " questions correctly!");
    quizContainer.remove();
}

function notLastQuestion() {
    return currentQuestion !== (allQuestions.length - 1);
}

function answerNotChosen() {
    finishContainer.innerHTML = "Choose answer!";
}

function notFirstQuestion() {
    return currentQuestion !== 0;
}

function previousQuestion() {
    currentQuestion--;
    setQuestion(currentQuestion);
}

function noMorePreviousQuestions() {
    finishContainer.innerHTML = "This is first question!";
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

function loggedInFirstTimeGreeting() {
    finishContainer.innerHTML = ("Hello first time " + localStorage.getItem("userName"));
}

function loggedInAgainGreeting() {
    finishContainer.innerHTML = ("Hello again " + localStorage.getItem("userName"));
}

function userNotFound() {
    finishContainer.innerHTML = ("User not found / Wrong user name or password");
}

function loginFieldsEmpty() {
    finishContainer.innerHTML = ("No data");
}

function registeredUser() {
    return localStorage.getItem("userName") === userNameContainer.value && localStorage.getItem("password") === passwordContainer.value;
}