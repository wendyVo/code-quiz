var startButton = document.getElementById("startBtn");
var timer = document.getElementById("timer");
var introContainer = document.getElementById("intro-container");
var questionContainerElement = document.getElementById("question-container");
var questionElement = document.getElementById("question");
var answerBtn1 = document.getElementById("answer1");
var answerBtn2 = document.getElementById("answer2");
var answerBtn3 = document.getElementById("answer3");
var answerBtn4 = document.getElementById("answer4");
var result = document.getElementById("result");
var title = document.getElementById("pageTitle");
var questionNo = 0;
var timeLeft = 0;
var quizTime = 0;
var score = 0;



//Function to set the timer and start the quiz
function countdown() {
    timer.innerHTML = (timeLeft);
    quizTime = setInterval(tick, 1000);
}

function tick() {
    if (timeLeft != 0) {
        timeLeft--,
        timer.innerHTML = (timeLeft);
    } else {
        clearInterval(quizTime);
        quizOver();
    }
    return;
}
//startButton.addEventListener('click', startQuiz);

//Function hide main introduction page and show questions quiz

function startQuiz() {
    timeLeft = 75;
    countdown();
    introContainer.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    quiz(questionNo);
}


// list of all questions, choices, and answers
var questionsArray = [{
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in JavaScript can be used to store ____.",
        choices: [
            "numbers and strings",
            "other arrays",
            "booleans",
            "all of the above"
        ],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        answer: "console.log"
    }
];

//Function to load the questions and answer to the array
function quiz() {
    if (questionNo >= questionsArray.length) {
        quizOver();
    } else {
        questionElement.innerHTML = (questionsArray[questionNo].title);
        answerBtn1.innerHTML = (questionsArray[questionNo].choices[0]);
        answerBtn2.innerHTML = (questionsArray[questionNo].choices[1]);
        answerBtn3.innerHTML = (questionsArray[questionNo].choices[2]);
        answerBtn4.innerHTML = (questionsArray[questionNo].choices[3]);
    }
}

//  function checks if the answer is correct or wrong
function answerCheck(buttonId) {
    if ((document.getElementById(buttonId).innerHTML) === (questionsArray[questionNo].answer)) {
        rightAnswer();
        questionNo++
    } else {
        wrongAnswer();
        questionNo++
    }
    quiz(questionNo);
}

//function check when answer is right
function rightAnswer() {
    score = timeLeft;
    result.innerHTML = ("Correct");
    setTimeout(function() {
            result.innerHTML = ("");
        },
        800
    )
}

// function check when the answer is wrong
function wrongAnswer() {
    timeLeft = (timeLeft - 10)
    result.innerHTML = ("Wrong");
    setTimeout(function() {
            result.innerHTML = ("");
        },
        800)
}

//  this function generates the end screen and allows user to submit initials with their score
function quizOver() {
    questionContainerElement.classList.add("hide");
    var content = document.getElementById('quizContent')
    var done = document.getElementById("done")
    var submit = document.getElementById("submit")

    timer.innerHTML = (0)

    content.insertAdjacentHTML('afterbegin', '<h1 id="done">All Done!</h1> <button id="submit" class="btn btn-danger">Submit</button> <input id="userScore"> - Enter Initials</input>');

    var done = document.getElementById("done")
    done.insertAdjacentHTML('afterend', '<p id="finalScore">Your final score is ' + score + '</p>');

    var submit = document.getElementById("submit")
    submit.addEventListener("click", function() {
        var value = document.getElementById('userScore').value;
        localStorage.setItem(value, score);
        window.location.href = "highscore.html"
    });
    clearInterval(quizTime)
}

// this function renders the table on the highscore table with the scores from local storage
function renderTable() {
    var tbody = document.getElementById("tableBody")
    for (let i = 0; i < localStorage.length; i++) {
        var userName = localStorage.key(i)
        var userScore = localStorage.getItem(userName);
        tbody.insertAdjacentHTML('afterbegin', '<tr class="scores"><td>' + userName + ' - ' + userScore + '</td></tr>')
    }
}
//  this function has the clear highscores button work by clearing local storage and re-rendering table
function clearStorage() {
    localStorage.clear();
    window.location.reload();
}