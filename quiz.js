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
        allQuestions[currentQuestion].userAnswer = checked();
        if (radioButtons[allQuestions[currentQuestion].correctAnswer].checked && !(allQuestions[currentQuestion].alreadyAnswredCorrectly)){
            correctAnswers++;
            allQuestions[currentQuestion].alreadyAnswredCorrectly = true;
        }
        if(currentQuestion != allQuestions.length - 1) {
            currentQuestion++;
            setQuestion(currentQuestion);
        }
        else{
            finishContainer.innerHTML = ("You answered " + correctAnswers + " questions correctly!");
            quizContainer.remove();
        }
    }
    else {
        finishContainer.innerHTML = "Choose!";
    }
}

function back() {
        if(currentQuestion != 0) {
            currentQuestion--;
            setQuestion(currentQuestion);
        }
        else{
            finishContainer.innerHTML = "This is first question!";
        }
}

function setQuestion (id){
    questionContainer.innerHTML = allQuestions[id].question;
    for (var i = 0; i < choicesContainers.length; i++ ){
        choicesContainers[i].innerHTML = allQuestions[id].choices[i];
        if (allQuestions[id].userAnswer || allQuestions[id].userAnswer == 0) {
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

function checked (){
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
    if(userNameContainer.value && passwordContainer.value) {
        if (!(localStorage.getItem("userName")) && !(localStorage.getItem("password"))) {
            localStorage.setItem("userName", userNameContainer.value);
            localStorage.setItem("password", passwordContainer.value);
            finishContainer.innerHTML = ("Hello first time " + localStorage.getItem("userName"));
            showData();
            document.cookie = "username=" + userNameContainer.value;
        }
        else if (localStorage.getItem("userName") == userNameContainer.value && localStorage.getItem("password") == passwordContainer.value) {
            finishContainer.innerHTML = ("Hello again " + localStorage.getItem("userName"));
            showData();
            document.cookie = "username=" + userNameContainer.value;
        }
        else {
            finishContainer.innerHTML = ("Wrong data");
        }
    }
    else {
        finishContainer.innerHTML = ("No data");
    }
}

function getCookie(cookieName) {
    var name = cookieName + "=";
    var splitCookie = document.cookie.split(';');
    for (var i = 0; i < splitCookie.length; i++){
        var currentCookie = splitCookie[i];
        if (currentCookie.charAt(0) == " "){
            currentCookie = currentCookie.substring(1);
        }
        if (currentCookie.indexOf(name) == 0){
            return currentCookie.substring(name.length);
        }
    }
    return "";
}

function checkCookie() {
    if (getCookie("username") != ""){
        finishContainer.innerHTML = ("Welcome " + getCookie("username"));
    }
    else {
        finishContainer.innerHTML = ("Welcome, new user!");
    }
}