// User scores
let userInitials = [];
let highScores = JSON.parse(localStorage.getItem("highScores"));

// Set score variable
let score;

const startButton = document.querySelector("#start-btn");
const quizEl = document.querySelector(".quizContent");
const introEl = document.querySelector(".intro");
const questionEl = document.querySelector(".question");
const highscoresEl = document.querySelector(".highscores");
const scoreListEl = document.querySelector(".scoreList");
const restartBtn = document.querySelector(".play-again-btn");
const timerEl = document.querySelector(".timer");

let currentQuestion;

let scoreForm = document.querySelector(".scoreForm");

let timeLeft;

// Object array of questions
const questions = [
  {
    question: "Why is Javascript so hard?",
    answers: [
      { option: "Do better", correct: true },
      { option: "You suck", correct: false },
      { option: "Happy Birthday", correct: false },
      { option: "Lets finish this", correct: false },
    ],
  },
  {
    question: "This is getting easier?",
    answers: [
      { option: "Maybe", correct: true },
      { option: "Who knows", correct: false },
      { option: "Definetly", correct: false },
      { option: "Let me die", correct: false },
    ],
  },
];

let quizTracker = questions.length;

// When start button is clicked
startButton.addEventListener("click", function () {
  timeLeft = 20;
  score = 0;
  currentQuestion = 0;
  console.log("Start Quiz");
  // Hide intro information
  introEl.classList.add("hide");
  // Start next question
  nextQuestion();

  // Start Timer
  var timer = setInterval(function () {
    timeLeft--;
    if (timeLeft === 0) {
      clearInterval(timer);
      quizEl.classList.add("hide");
      scoreForm.classList.remove("hide");
    } else if (currentQuestion === questions.length) {
      clearInterval(timer);
    }

    timerEl.innerHTML = `Time: ${timeLeft}`;
    console.log(timeLeft);
  }, 1000);
});

// Take questions array and select current question and move onto show question function
function nextQuestion() {
  showQuestion(questions[currentQuestion]);
}

// Take current questions[] array and add list items
function showQuestion(question) {
  // Insert question title
  let questionTitle = document.createElement("h2");
  questionTitle.textContent = question.question;
  questionEl.appendChild(questionTitle);
  // Loop through each of answers objects
  question.answers.forEach((answers) => {
    // Create li for each option
    let option = document.createElement("li");
    // Add content to each li
    option.innerHTML = answers.option;
    option.classList.add("optionClass");
    if (answers.correct) {
      option.dataset.correct = answers.correct;
    }
    // Add option to quizEl ()
    questionEl.appendChild(option);
    // When option (li) is clicked, move to selectAnswer function
    option.addEventListener("click", selectAnswer);
  });
}

function selectAnswer(event) {
  // Check if answer is correct
  let selection = event.target.getAttribute("data-correct");
  // Add one to score
  if (selection === "true") {
    score += 10;
    console.log("score:", score);
  } else {
    score -= 5;
    timeLeft -= 5;
  }

  currentQuestion++;
  // Clear quiz actions
  questionEl.textContent = "";
  if (currentQuestion < quizTracker) {
    nextQuestion();
  } else {
    let finalScore = scoreForm.querySelector("#scoreHolder");
    finalScore.textContent = `Score: ${score}`;
    scoreForm.classList.remove("hide");
  }
}

let submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let userInput = document.getElementById("userInitials").value;
  let newSavedScore = {
    score: score,
    userName: userInput,
  };

  setScores(newSavedScore);

  scoreForm.classList.add("hide");
  highscoresEl.classList.remove("hide");
});

// Referenced http://jsfiddle.net/Bxn2t/1/ to pull entries and resave new ones
let setScores = function (newSavedScore) {
  // Set array to empty if no local storage
  if (highScores === null) {
    highScores = [];
  }
  // Push new object to highscore array
  highScores.push(newSavedScore);

  //Followed Youtube Video https://bit.ly/3LWvhPl to figure out local storage/sorting scores
  highScores.sort((a, b) => b.score - a.score);

  // Limit list to set amount of objects
  highScores.splice(5);

  // Update local storage with updated scores
  localStorage.setItem("highScores", JSON.stringify(highScores));

  scorePage();
};

let scorePage = function () {
  if (highScores) {
    scoreListEl.innerHTML = highScores
      .map((score) => {
        return `<li> ${score.userName}: ${score.score}</li>`;
      })
      .join("");
  }
};

scorePage();

// Clear Scores
let clearScores = document.querySelector(".clear-scores");

clearScores.addEventListener("click", function () {
  highScores = [];
  localStorage.removeItem("highScores");
  scoreListEl.innerHTML = "";
});

// Play again
restartBtn.addEventListener("click", function () {
  introEl.classList.remove("hide");
  highscoresEl.classList.add("hide");
  timerEl.innerHTML = "";
});

// Jump to highscores
let showHighScores = document.querySelector(".jump-to-highscores");
showHighScores.addEventListener("click", function () {
  introEl.classList.add("hide");
  questionEl.innerHTML = "";
  highscoresEl.classList.remove("hide");
  scoreForm.classList.add("hide");
  timeLeft = 0;
});
