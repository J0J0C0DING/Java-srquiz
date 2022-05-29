let score = 0;
let userInitials;

let startButton = document.querySelector("#start-btn");
let quizEl = document.querySelector(".quizContent");
let introEl = document.querySelector(".intro");
let questionEl = document.querySelector(".question");

let currentQuestion = 0;

// Object array of options
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
console.log(quizTracker);

// When start button is clicked
startButton.addEventListener("click", function () {
  console.log("Start Quiz");
  // Hide intro information
  introEl.classList.add("hide");
  // Start next question
  nextQuestion();
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
    // decrease time by 10
    // insert timer decrease here
  }

  currentQuestion++;
  // Clear quiz actions
  questionEl.textContent = "";
  if (currentQuestion < quizTracker) {
    nextQuestion();
  } else {
    console.log("end of quiz");
  }
}
