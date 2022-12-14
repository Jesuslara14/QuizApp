//Classes

class Answer{
    constructor(value, evaluation){
        this.value = value;
        this.evaluation = evaluation;
        this.selectionState = false;
    }
}

class Question{
    constructor(name){
        this.name = name;
        this.answers = [];
    }

    appendAnswer(answer){
        if(this.answers.length < 5){
            this.answers.push(answer);
        }
    }
}

class Quiz{
    constructor(name, id){
        this.id = id;
        this.name = name;
        this.questions = [];
    }
    
    appendQuestion(question){
        this.questions.push(question);
    }
}

//Global Use Variables

var titleScreen = document.getElementById('titleScreen');
var quizScreen = document.getElementById('quizScreen');
var creatorScreen = document.getElementById('creatorScreen');
var testingScreen = document.getElementById('testingScreen');
var quizSelection = document.getElementById('quizSelection');
var questionPad = document.getElementById('questionPad');
var scorePad = document.getElementById('scorePad');
var questionNameDisplay = document.getElementById('questionName');
var questionNumberDisplay = document.getElementById('questionNumber');
var scoreNumber = document.getElementById('scoreNumber');
var answerDisplaySlots = document.getElementsByClassName('answer');
var quizList = [];

//Title Screen

document.getElementById('takeQuiz').addEventListener('click', function(){
    titleScreen.style.display = "none";
    quizScreen.style.display = "block";
    appendQuizzes();
});

document.getElementById('createQuiz').addEventListener('click', function(){
    titleScreen.style.display = "none";
    creatorScreen.style.display = "block";
});

//Quiz Selection Screen

createDefaultQuiz();

document.getElementById('nextButton').addEventListener('click', nextQuestionPage);

for(var i = 0; i < answerDisplaySlots.length; i++){
    answerDisplaySlots[i].addEventListener('click', setUserAnswer);
}

//Testing Area Screen

var currentQuiz;
var currentQuestion;

function startQuiz(){
    quizScreen.style.display = "none";
    testingScreen.style.display = "block"
    currentQuiz = filterQuiz(this.parentNode.id);
    currentQuestion = 0;
    questionPad.style.display = "block";
    scorePad.style.display = "none";
    //Load First Question
    loadQuestion(currentQuiz.questions[currentQuestion]);
}

function setUserAnswer(){
    var optionSelected = parseInt(this.id.slice(-1)) - 1;
    console.log(optionSelected);
    for(var i = 0; i < 4; i++){
        currentQuiz.questions[currentQuestion].answers[i].selectionState = false;
        answerDisplaySlots[i].style.backgroundColor = "yellow";
        console.log(currentQuiz.questions[currentQuestion].answers[i].selectionState);
    }
    this.style.backgroundColor = "blue";
    currentQuiz.questions[currentQuestion].answers[optionSelected].selectionState = true;
    console.log(currentQuiz.questions[currentQuestion].answers[optionSelected].selectionState);
}

function nextQuestionPage(){
    for(var i = 0; i < 4; i++){
        answerDisplaySlots[i].style.backgroundColor = "yellow";
    }
    currentQuestion++;
    if(currentQuestion < currentQuiz.questions.length){
        loadQuestion(currentQuiz.questions[currentQuestion]);
    }else{
        evaluateQuiz();
    }
}

function loadQuestion(question){
    questionNameDisplay.innerHTML = question.name;
    questionNumberDisplay.innerHTML = currentQuestion + 1;
    for(var i = 0; i < question.answers.length; i++){
        answerDisplaySlots[i].innerHTML = i + 1 + ". " + question.answers[i].value;
    }
}

function evaluateQuiz(){
    var finalScore = 0;
    questionPad.style.display = "none";
    scorePad.style.display = "block";
    for(var i = 0; i < currentQuiz.questions.length; i++){
        for(var j = 0; j <currentQuiz.questions[i].answers.length; j++){
            if(currentQuiz.questions[i].answers[j].selectionState == true && currentQuiz.questions[i].answers[j].evaluation == true){
                currentQuiz.questions[i].answers[j].selectionState = false;
                finalScore++;
                console.log(finalScore);
            }
        }
    }
    scoreNumber.innerHTML = finalScore + "/" + currentQuiz.questions.length;
}

//Misc Functions

function returnToTitleScreen(){
    titleScreen.style.display = "flex";
    quizScreen.style.display = "none";
    creatorScreen.style.display = "none";
    testingScreen.style.display = "none";
    scoreNumber.innerHTML = 0;
}

function appendQuizzes(){
    quizSelection.innerHTML = "";
    for(var i = 0; i < quizList.length; i++){
        var newQuizzes = document.createElement('div');
        var newButtons = document.createElement('button');
        
        newQuizzes.className = "quizOption";
        newQuizzes.id = quizList[i].id;
        newQuizzes.innerHTML = quizList[i].name;

        newButtons.innerHTML = "Start";
        newButtons.className = "startQuizButton";
        newButtons.addEventListener('click', startQuiz)

        newQuizzes.appendChild(newButtons);
        quizSelection.appendChild(newQuizzes);
    }
}

function filterQuiz(quizId){
    for(var i = 0; i < quizList.length; i++){
        if(quizList[i].id == quizId){
            return quizList[i];
        }
    }
}

//Creator or Import Screen Algorithm

function createQuiz(){
    var newQuiz;
    var consoleForm = document.getElementById('quizInputConsole').value;
    newQuiz = new Quiz()
}

function findContent(startContentIndex, endContentIndex){

}

function findQuestions(consoleForm){

}

//Example Quiz

function createDefaultQuiz(){
    var defaultQuiz = new Quiz("Fun Fact Quiz", "defaultQuiz");
    var defaultQuestion1 = new Question("What is the biggest planet?");
    var defaultQuestion2 = new Question("Which animal is the smartest?");
    var defaultQuestion3 = new Question("Which colors make white?");

    defaultQuestion1.appendAnswer(new Answer("Mercury", false));
    defaultQuestion1.appendAnswer(new Answer("Mars", false));
    defaultQuestion1.appendAnswer(new Answer("Jupiter", true));
    defaultQuestion1.appendAnswer(new Answer("Your Mother", false));

    defaultQuestion2.appendAnswer(new Answer("Dolphin", false));
    defaultQuestion2.appendAnswer(new Answer("Fruit Flies", false));
    defaultQuestion2.appendAnswer(new Answer("Furries", false));
    defaultQuestion2.appendAnswer(new Answer("Orangutan", true));

    defaultQuestion3.appendAnswer(new Answer("All of them", true));
    defaultQuestion3.appendAnswer(new Answer("Depends", false))
    defaultQuestion3.appendAnswer(new Answer("Green and Yellow", false));
    defaultQuestion3.appendAnswer(new Answer("Pink and Yellow", false));
    
    defaultQuiz.appendQuestion(defaultQuestion1);
    defaultQuiz.appendQuestion(defaultQuestion2);
    defaultQuiz.appendQuestion(defaultQuestion3);

    quizList.push(defaultQuiz);
}

//depression