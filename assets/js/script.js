const QUIZ_ARRAY = [{question: "Question 1",answer: ["true", "false"]},{question: "Question 2",answer: ["true", "false1", "false2"]},{question: "Question 3",answer: ["true", "false1","false2","false3"]}]
let mainContent = document.getElementById("page-content");
let timeScore = 100;
let questionNumber = 0;

let createQuestionPage = function (questionObject) {
  // Clear last page
  while (mainContent.firstChild){
    mainContent.removeChild(mainContent.firstChild);
  }

  // Create question page
  let questionPage = document.createElement("div");

  let questionText = document.createElement("h2");
  questionText.textContent = questionObject.question;

  questionPage.appendChild(questionText);

  for (var j = 0; j < questionObject.answer.length; j++) {
    let answerText = document.createElement("button");
    answerText.textContent = questionObject.answer[j];

    questionPage.appendChild(answerText);
  }

  mainContent.appendChild(questionPage);

}

let runQuiz = function() {

  // Start Timer Countdown

  createQuestionPage(QUIZ_ARRAY[questionNumber]);
    

  
}

// Create and display invitation to start the quiz
let initiateContent = function () {
  let welcomePage = document.createElement("div");
  
  let welcomeText = document.createElement("h2");
  welcomeText.textContent = "Press the button to start the quiz."

  let startButton = document.createElement("button");
  startButton.addEventListener("click", runQuiz);
  
  welcomePage.appendChild(welcomeText);
  welcomePage.appendChild(startButton);

  mainContent.appendChild(welcomePage);
}

initiateContent();