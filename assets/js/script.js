/* 
JavaScript Coding Quiz
Module 4 Challenge Assignment: Web APIs

Author: TJ James
*/

/* Start Global Variables */

// Questions taken and adapted from https://data-flair.training/blogs/javascript-quiz/
const QUIZ_ARRAY = [
  {
    question:"If you type the following code in the console window, what result will you get?\n3 > 2 > 1 === false;", 
    answer: [
      {"text": "True","isCorrect": "Correct!"}, 
      {"text": "False","isCorrect": "Incorrect!"}
    ]
  }, {
    question: "JavaScript is a _____-side programming language.", 
    answer: [
      {"text": "Both","isCorrect": "Correct!"}, 
      {"text": "Client","isCorrect": "Incorrect!"}, 
      {"text": "Server","isCorrect": "Incorrect!"}, 
      {"text": "None","isCorrect": "Incorrect!"}
    ]
  },{
    question: "Which of the following will write the message 'Hello Sunshine!' in an alert box?",
    answer: [
      {"text": "alert('Hello Sunshine!');","isCorrect": "Correct!"}, 
      {"text": "alertBox('Hello Sunshine!');","isCorrect": "Incorrect!"}, 
      {"text": "alert(Hello Sunshine!);","isCorrect": "Incorrect!"}, 
      {"text": "msgAlert('Hello Sunshine!');","isCorrect": "Incorrect!"}
    ]
  },{
    question: "How do you find the minimum of x and y using JavaScript?",
    answer: [
      {"text": "Math.min(x,y)","isCorrect": "Correct!"}, 
      {"text": "min(x,y);","isCorrect": "Incorrect!"}, 
      {"text": "Math.min(xy)","isCorrect": "Incorrect!"}, 
      {"text": "min(xy);","isCorrect": "Incorrect!"}
    ]
  },{
    question: "Which of the following statements will throw an error?",
    answer: 
    [
      {"text": "var fun = function bar{ }","isCorrect": "Correct!"}, 
      {"text": "var fun = function bar( ){ }","isCorrect": "Incorrect!"}, 
      {"text": "function fun( ){ }","isCorrect": "Incorrect!"}
    ]
  },{
    question: "If the value of x is 40, then what is the output of the following program?\n(x % 10 == 0)? console.log(“Divisible by 10”) : console.log(“Not divisible by 10”);",
    answer: [
      {"text": "Divisible by 10","isCorrect": "Correct!"}, 
      {"text": "ReferenceError","isCorrect": "Incorrect!"}, 
      {"text": "Not divisible by 10","isCorrect": "Incorrect!"}, 
      {"text": "None of the above","isCorrect": "Incorrect!"}
    ]
  },{
    question: "Which JavaScript label catches all the values, except for the ones specified?",
    answer: [
      {"text": "default","isCorrect": "Correct!"}, 
      {"text": "catch","isCorrect": "Incorrect!"}, 
      {"text": "label","isCorrect": "Incorrect!"}, 
      {"text": "try","isCorrect": "Incorrect!"}
    ]
  },{
    question: "Which are the correct 'if' statements to execute certain code if 'x' is equal to 2?",
    answer: [
      {"text": "if(x == 2)","isCorrect": "Correct!"}, 
      {"text": "if(x 2)","isCorrect": "Incorrect!"}, 
      {"text": "if(x = 2)","isCorrect": "Incorrect!"}, 
      {"text": "if(x != 2 )","isCorrect": "Incorrect!"}
    ]
  },{
    question: "What will the code return?\nBoolean(3 < 7)",
    answer: [
      {"text": "true","isCorrect": "Correct!"}, 
      {"text": "false","isCorrect": "Incorrect!"}, 
      {"text": "NaN","isCorrect": "Incorrect!"}, 
      {"text": "SyntaxError","isCorrect": "Incorrect!"}
    ]
  },{
    question: "What is the output of the following code in the console?\nvar x = 0;\nfunction fun(){\n\t++x;\n\tthis.x = x;\n\treturn x;\n}\nvar bar = new new fun;\nconsole.log(bar.x);",
    answer: [
      {"text": "TypeError","isCorrect": "Correct!"}, 
      {"text": "ReferenceError","isCorrect": "Incorrect!"}, 
      {"text": "undefined","isCorrect": "Incorrect!"}, 
      {"text": "1","isCorrect": "Incorrect!"}
    ]
  },{
    question: "Which is the correct JavaScript syntax to change the HTML content given below?\n<p id=”test”>Hello World!</p>",
    answer: [
      {"text": "document.getElementById(“test”).innerHTML = “Hello Sunshine!”;","isCorrect": "Correct!"}, 
      {"text": "document.getElementsById(“test”).innerHTML = “Hello Sunshine!”;","isCorrect": "Incorrect!"}, 
      {"text": "document.getElementById(test).innerHTML = “Hello Sunshine!”;","isCorrect": "Incorrect!"}, 
      {"text": "document.getElementByTagName(“p”)[0].innerHTML = “Hello Sunshine!”;","isCorrect": "Incorrect!"}
    ]
  }
];

// Create JS elements from HTML
let mainContent = document.getElementById("page-content");
let timerEl = document.getElementById("timer");
let resultEl = document.getElementById("answer-result");

// Global Variables
let timeScore, questionNumber = 0;
let highScores = [];
let startTimer, resultTimer;

/* End Global Variables */

/* Start Utility Functions */

// Clear the main display area to prepare for next screen
let clearDisplayArea = function () {
  while (mainContent.firstChild){
    mainContent.removeChild(mainContent.firstChild);
  }
}

// Add new score to localStorage
let updateHighScores = function(initialsInput, score) {
  // Create object
  let newScore = {"initials": initialsInput, "score": score};
  // Push to existing scores array
  highScores.push(newScore);
  // Sort scores
  highScores.sort((a, b) => b.score - a.score);
  // If there are more than 10 scores, drop off the lowest
  while (highScores.length > 10) {
    highScores.pop();
  }
  
  // Add updated high scores to localStorage
  localStorage.setItem("codingQuizHighScores", JSON.stringify(highScores))
}

// Timer functionality
let runTime = function () {
  timeScore--;
  timerEl.textContent = "Timer " + timeScore
  
  // Finish the quiz when the timer hits 0
  if (timeScore <= 0) {
    clearInterval(runTime);
    createResultsPage()
  }
}

// Array shuffler from https://javascript.info/task/shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    // swap elements array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Begins the quiz
let runQuiz = function() {
  // Reset to start state
  questionNumber = 0;
  timeScore = 100
  
  //Start Timer Countdown
  timerEl.textContent = "Timer " + timeScore
  startTimer = setInterval(runTime, 1000);
  
  // Randomize question array
  shuffle(QUIZ_ARRAY);
  
  // Start creating questions
  createQuestionPage(QUIZ_ARRAY[questionNumber]);
}
/* End Utility Functions*/

/* Start Handler Functions */

// Clear High Scores
let clearHighScoresHandler = function() {
  if (highScores.length){
    
    let clearScores = confirm("Are you sure you want to clear the scores?");
    if (clearScores){
      localStorage.setItem("codingQuizHighScores", "");
      highScores = [];
      createHighScoresPage();
    }
  }
}

// Submit High Score
let initialsInputHandler = function(initials, score) {
  // check that initials were entered
  if (initials.length <= 0){
    alert("Please enter your initials.")
  } else {
    updateHighScores(initials, score); 
    createHighScoresPage();
  }
}

// Answer handler
let answerHandler = function (result) {
  // Reset timer (no overlap between questions)
  clearTimeout(resultTimer);
  
  // Time penalty for wrong answer
  if (result === "Incorrect!") {
    timeScore = timeScore - 10;
  }
  
  // Show notification
  resultEl.innerHTML = result
  resultTimer = setTimeout( () => {resultEl.innerHTML = ""},   1000);
  
  // Finish quiz if out of time
  if (timeScore <= 0) {
    createResultsPage();
  }
  // Next Question
  createQuestionPage(QUIZ_ARRAY[questionNumber]);
}
/* End Handler Functions*/

/* Start Main Content Display Area Functions */

// HIGH SCORES PAGE
let createHighScoresPage = function() {
  
  // Clear mainContent
  clearDisplayArea();
  
  // Create HTML Elements
  let highScoresPage = document.createElement("div");
  
  let highScoresH1 = document.createElement("h1");
  highScoresH1.textContent = "Top 10 High Scores"
  
  let highScoresList = document.createElement("ol");
  for (let i = 0; i < highScores.length; i++) {
    let highScoresListItem = document.createElement("li");
    highScoresListItem.textContent = highScores[i].initials + "  -  " + highScores[i].score;
    
    highScoresList.appendChild(highScoresListItem);
  }
  
  let highScoresHomeButton = document.createElement("button");
  highScoresHomeButton.textContent = "Back to the Starting Page";
  highScoresHomeButton.addEventListener("click", createStartPage);
  
  let highScoresClearButton = document.createElement("button");
  highScoresClearButton.textContent = "Reset the High Scores";
  highScoresClearButton.addEventListener("click", clearHighScoresHandler)
  
  // Add HTML elements to page
  highScoresPage.appendChild(highScoresH1);
  highScoresPage.appendChild(highScoresList);
  highScoresPage.appendChild(highScoresHomeButton);
  highScoresPage.appendChild(highScoresClearButton);
  
  mainContent.appendChild(highScoresPage);
}

// QUIZ RESULTS PAGE
let createResultsPage = function() {
  // Clear mainContent
  clearDisplayArea();
  
  // Stop and hide timer
  clearInterval(startTimer)
  timerEl.textContent = "";
  
  // Scores can't be negative
  if (timeScore < 0) {
    timeScore = 0
  };
  
  // Create HTML elements
  let resultsPage = document.createElement("div");
  
  let resultsH1 = document.createElement("h1");
  resultsH1.textContent = "All done!";
  
  let resultsH2 = document.createElement("h2");
  resultsH2.textContent = "Your final score is " + timeScore + ".";
  
  let inputDiv = document.createElement("div");
  inputDiv.setAttribute("id", "initialsInput")
  
  let inputLabel = document.createElement("h3");
  inputLabel.setAttribute("id", "input-label");
  inputLabel.textContent = "Enter initials: "
  
  let initialsInput = document.createElement("input");
  initialsInput.setAttribute("id", "initials-input")
  initialsInput.setAttribute("maxlength", "3");
  
  let inputButton = document.createElement("button");
  inputButton.textContent = "Submit";
  inputButton.addEventListener("click", function() {initialsInputHandler(initialsInput.value, timeScore)});
  
  // Add HTML elements to page
  inputDiv.appendChild(inputLabel);
  inputDiv.appendChild(initialsInput);
  inputDiv.appendChild(inputButton);
  resultsPage.appendChild(resultsH1);
  resultsPage.appendChild(resultsH2);
  resultsPage.appendChild(inputDiv);
  
  mainContent.appendChild(resultsPage);
  
}

// QUESTION PAGE
let createQuestionPage = function (questionObject) {
  
  // If the user is out of questions or out of time, skip to the result page
  if (questionNumber >= 10 || timeScore <= 0 || !questionObject) {
    createResultsPage();
  }
  
  // Create the next question
  else {
    
    // Clear mainContent
    clearDisplayArea();
    
    // Create HTML elements    
    let questionPage = document.createElement("div");
    
    let questionText = document.createElement("h2");
    questionText.innerHTML = "<pre>" + questionObject.question + "</pre>";
    
    let answerButtonDiv = document.createElement("div");
    answerButtonDiv.setAttribute("id", "answer-button-div")
    
    // shuffle order of answers and create buttons
    let answerList = questionObject.answer;
    shuffle(answerList);
    
    for (let i = 0; i < answerList.length; i++) {
      let answerButton = document.createElement("button");
      answerButton.innerHTML = "<code>" + answerList[i].text + "</code>";
      answerButton.addEventListener("click", function () {answerHandler(answerList[i].isCorrect)});
      
      answerButtonDiv.appendChild(answerButton);
    }
    
    // Add HTML elements to page
    questionPage.appendChild(questionText);
    questionPage.appendChild(answerButtonDiv);
    
    mainContent.appendChild(questionPage);
    
    // Increment questionNumber to advance to next question
    questionNumber++;
  }
}

// STARTING PAGE
let createStartPage = function () {
  
  // Clear display area
  clearDisplayArea();
  
  // Create HTML elements
  let startPage = document.createElement("div");
  
  let startH2 = document.createElement("h2");
  startH2.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!"
  
  let startButton = document.createElement("button");
  startButton.textContent = "Start Quiz"
  startButton.addEventListener("click", runQuiz);
  
  let highScoreButton = document.createElement("button");
  highScoreButton.textContent = "View High Scores"
  highScoreButton.addEventListener("click", createHighScoresPage);
  
  // Add HTML elements to page
  startPage.appendChild(startH2);
  startPage.appendChild(startButton);
  startPage.appendChild(highScoreButton);
  
  mainContent.appendChild(startPage);
  
  // Pull and parse scores if in localStorage
  if (localStorage.getItem("codingQuizHighScores")){
    highScores = JSON.parse(localStorage.getItem("codingQuizHighScores"));
  }
}
/* End Main Content Display Functions */

/* Initiate Quiz*/
createStartPage();