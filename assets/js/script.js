const QUIZ_ARRAY = [{question: "",answer: ""},{question: "",answer: ""},{question: "",answer: ""},{question: "",answer: ""},{question: "",answer: ""},{question: "",answer: ""},{question: "",answer: ""},{question: "",answer: ""},{question: "",answer: ""},{question: "",answer: ""}];
let mainContent = document.getElementById("page-content");

let runQuiz = function() {
  alert("pressed")
}

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