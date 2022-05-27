let score = 0;

let questions = {
  q1: "Example Question 1",
  q2: "Example Question 2",
  q3: "Example Question 3",
};

let options = {
  a1: {
    option1: "Wrong Answer",
    option2: "Wrong Answer",
    option3: "Correct Answer",
    option4: "Wrong Answer",
  },

  a2: {
    option1: "Wrong Answer",
    option2: "Wrong Answer",
    option3: "Correct Answer",
    option4: "Wrong Answer",
  },
};

let startQuiz = document.querySelector("button");

startQuiz.addEventListener("click", function () {
  let intro = document.querySelector(".intro");
  intro.classList.add("hide");
  quizHolder();
  console.log(intro);
});

let quizHolder = function (event) {
  // create div to hold quiz
  let holder = document.createElement("div");
  holder.classList.add("quiz-holder");

  // create title
  let questionTitle = document.createElement("h2");
  questionTitle.textContent = `${questions.q1}`;

  // create unordered list
  let optionHolder = document.createElement("ul");

  holder.appendChild(questionTitle, optionHolder);

  // Create new li for each option
  for (let i = 0; i < Object.keys(options.a1).length; i++) {
    let optionText = Object.values(options.a1)[i];
    let newOption = document.createElement("li");
    newOption.textContent = optionText;
    newOption.setAttribute("answer", i);
    holder.appendChild(newOption);
  }

  // apphend to main
  document.querySelector("main").appendChild(holder);
};
