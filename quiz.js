const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
var timer = 75;
var timerEl = document.querySelector("#timer")
var timeEl = document.querySelector("time");
var mainEl = document.getElementById("main");
var secondsLeft = 75;


function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timerEl.textContent = secondsLeft;
    if (secondsLeft === 0 || startQuizBtn) {
      clearInterval(timerInterval);
      nextQuestion();
    }

  }, 1000);
}


let questions = [
  {
    question: "Commonly used data types don't include",
    choice1: "<strings>",
    choice2: "<booleans>",
    choice3: "<alerts>",
    choice4: "<numbers>",
    answer: 3
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ____.",
    choice1: "<quotes>",
    choice2: "<curly brackets>",
    choice3: "<square brackets>",
    choice4: "<parentheses>",
    answer: 3
  },
  {
    question: "Arrays in JavaScript can be used to store____?",
    choice1: "numbers and strings;",
    choice2: "other arrays;",
    choice3: "booleans;",
    choice4: "all of the above;",
    answer: 4
  },
  {
    question: "String values must be enclosed within ____ being assigned to variables.",
    choice1: "commas;",
    choice2: "curly brackets;",
    choice3: "quotes;",
    choice4: "parentheses;",
    answer: 2
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is.",
    choice1: "JavaScript;",
    choice2: "Terminal/bash;",
    choice3: "For loops;",
    choice4: "console.log;",
    answer: 1
  }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {

  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    //go to the end page
    return window.location.href = ("end.html");
  }
  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

setTime();
startGame();
