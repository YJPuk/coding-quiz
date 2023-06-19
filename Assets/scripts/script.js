var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#timer");
var choicesEl = document.querySelector("#options");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var nameEl = document.querySelector("#name");
var feedbackEl = document.querySelector("#feedback");
var reStartBtn = document.querySelector("#restart");

//questions and answers
var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        options: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },

    {
        question: "The condition in an if / else statement is enclosed within _____.",
        options: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        answer: "curly brackets"
    },

    {
        question: "Arrays in JavaScript can be used to store",
        options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },

    {
        question: "String values must be enclosed within ____ when assigned to variables",
        options: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes" 
    },

    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["JavaScript", "Terminal / Bash", "For Loops", "console.log"],
        answer: "console.log"
    }];

//questions Timing
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function quizStart() {
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    var landingScreenEl = document.getElementById("startDisplay");
    landingScreenEl.setAttribute("class", "hidden");
    questionsEl.removeAttribute("class");
    getQuestion();
}

function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
  var questionEl = document.getElementById("question-words")
    questionEl.textContent = currentQuestion.question;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = questionClick;
        choicesEl.appendChild(choiceBtn);
    });
}

//Function that takes time out for wrong answers
function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
      time -= 15;
      if (time < 0) {
        time = 0;
      }
      timerEl.textContent = time;
      feedbackEl.textContent = "Wrong❌!";
      feedbackEl.style.color = "red";
    } else {
      feedbackEl.textContent = "Correct!✅";
      feedbackEl.style.color = "green";
    }
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hidden");
    }, 2000);
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
}

//Quiz end, clear interval to reset 
function quizEnd() {
    clearInterval(timerId);
    var endScreenEl = document.getElementById("quizEnd");
    endScreenEl.removeAttribute("class");
    var finalScoreEl = document.getElementById("scoreTotal");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hidden");
}

//Timer function that initiates quiz ending if the timer reaches 0
function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
      quizEnd();
    }
}

//Function that puts scores to local storage, 
function saveHighscores() {
    var name = nameEl.value.trim();
    if (name !== "") {
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
      var newScore = {
        score: time,
        name: name
      };
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
      window.location.href="highscores.html";
    }
}

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscores();
    }
}
nameEl.onkeyup = checkForEnter;

submitBtn.onclick = saveHighscores;

startBtn.onclick = quizStart;

