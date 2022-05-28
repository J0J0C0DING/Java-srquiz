let startButton = document.querySelector("#start-btn");
let quizEl = document.querySelector(".quizContent");
let introEl = document.querySelector(".intro");
let questionEl = document.querySelector(".question");

let currentQuestion = 0;

const questions = [
  {
    question: "Why is Javascript so hard?",
    answers: [
      { option: "Do better", correct: true },
      { option: "You suck", correct: false },
    ],
  },
];

startButton.addEventListener("click", function () {
  console.log("Start Quiz");
  introEl.classList.add("hide");
  nextQuestion();
});

function nextQuestion() {
  showQuestion(questions[currentQuestion]);
}

function showQuestion(question) {
  questionEl.innerText = question.question;
  question.answers.forEach((answer) => {
    let option = document.createElement("li");
    option.innerText = answer.text;
    if (answer.correct) {
      option.dataset.correct = option.correct;
    }
    option.addEventListener("click", selectAnswer);
    quizEl.appendChild(option);
  });
}

function selectAnswer(event) {}

// let generateQuiz = function () {
//   // Set question title
//   let questionTitle = document.createElement("h2");
//   questionTitle.textContent = "exampleQuestion";
//   questionTitle.setAttribute("id", "question-title");

//   // Create unordered list
//   let questionList = document.createElement("ul");

//   // Add answer options
//   let options = document.createElement("li");
//   options.textContent = "Example Answer";
//   questionList.appendChild(options);

//   quizEl.appendChild(questionTitle);

//   quizEl.appendChild(questionList);
// };
