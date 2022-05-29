// User scores
let highScores = [];
let userInitials = [];

// Set score variable
let score;

let startButton = document.querySelector("#start-btn");
let quizEl = document.querySelector(".quizContent");
let introEl = document.querySelector(".intro");
let questionEl = document.querySelector(".question");
let highscoresEl = document.querySelector(".highscores");

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
      alert("You've run out of time!");
    } else if (currentQuestion === questions.length) {
      clearInterval(timer);
    }
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
    score += 1;
    console.log("score:", score);
  } else {
    timeLeft = timeLeft - 5;
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

    console.log("end of quiz");
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

  //Followed Youtube Video https://bit.ly/3LWvhPl to figure out local storage/sorting scores
  highScores.push(newSavedScore);

  highScores.sort((a, b) => b.score - a.score);

  highScores.splice(5);

  console.log(highScores);

  localStorage.setItem("highscores", JSON.stringify(highScores));
  introEl.classList.remove("hide");
  scoreForm.classList.add("hide");
});
