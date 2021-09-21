const QUIZ_ARRAY = [
  {
    question:"If you type the following code in the console window, what result will you get?\n3 > 2 > 1 === false;", 
    answer: ["true", "false"]
  }, {
    question: "JavaScript is a _____-side programming language.", 
    answer: ["Both","Client","Server", "None"]
    // },{
    //   question: "Which of the following will write the message 'Hello Sunshine!' in an alert box?",
    //   answer: ["alert('Hello Sunshine!');", "alertBox('Hello Sunshine!');", "alert(Hello Sunshine!);", "msgAlert('Hello Sunshine!');"]
    // },{
    //   question: "How do you find the minimum of x and y using JavaScript?",
    //   answer: ["Math.min(x,y)", "min(x,y);", "Math.min(xy)", "min(xy);"]
    // },{
    //   question: "Which of the following statements will throw an error?",
    //   answer: ["var fun = function bar{ }", "var fun = function bar( ){ }", "function fun( ){ }"]
    // },{
    //   question: "If the value of x is 40, then what is the output of the following program?\n(x % 10 == 0)? console.log(“Divisible by 10”) : console.log(“Not divisible by 10”);",
    //   answer: ["Divisible by 10", "ReferenceError", "Not divisible by 10", "None of the above"]
    // },{
    //   question: "Which JavaScript label catches all the values, except for the ones specified?",
    //   answer: ["default", "catch", "label", "try"]
    // },{
    //   question: "Which are the correct 'if' statements to execute certain code if 'x' is equal to 2?",
    //   answer: ["if(x == 2)", "if(x 2)", "if(x = 2)", "if(x != 2 )"]
    // },{
    //   question: "What will the code return?\nBoolean(3 < 7)",
    //   answer: ["true", "false", "NaN", "SyntaxError"]
    // },{
    //   question: "What is the output of the following code in the console?\nvar x = 0;\nfunction fun(){\n\t++x;\n\tthis.x = x;\n\treturn x;\n}\nvar bar = new new fun;\nconsole.log(bar.x);",
    //   answer: ["TypeError", "ReferenceError", "undefined", "1"]
    // },{
    //   question: "Which is the correct JavaScript syntax to change the HTML content given below?\n<p id=”test”>Hello World!</p>",
    //   answer: ["document.getElementById(“test”).innerHTML = “Hello Sunshine!”;", "document.getElementsById(“test”).innerHTML = “Hello Sunshine!”;", "document.getElementById(test).innerHTML = “Hello Sunshine!”;", "document.getElementByTagName(“p”)[0].innerHTML = “Hello Sunshine!”;"]
  }
];

let mainContent = document.getElementById("page-content");
let timerEl = document.getElementById("timer");
let footer = document.getElementById("answer-result");
let timer, score, questionNumber = 0;
let highScores = [];
// let score = 0;
// let questionNumber = 0 ;
let startTimer;

// Clear mainContent
let clearMainContent = function () {
  while (mainContent.firstChild){
    mainContent.removeChild(mainContent.firstChild);
  }
}

// Answer handler
let answer = function (result) {
  if (result === "Incorrect!") {
    timer = timer - 10;
  }
  score = timer;
  footer.innerHTML = result
  setTimeout( () => {footer.innerHTML = ""},   1000);
  createQuestionPage(QUIZ_ARRAY[questionNumber]);
}

// Fill main section with high scores
let createHighScoresPage = function() {
  
  // Clear mainContent
  clearMainContent();
  
  let highScoresPage = document.createElement("div");
  
  let highScoresH1 = document.createElement("h1");
  highScoresH1.textContent = "Top 10 High Scores"

  let highScoresList = document.createElement("ol");
  for (let i = 0; i < highScores.length; i++) {
    let highScoresListItem = document.createElement("li");
    highScoresListItem.textContent = highScores[i].initials + " - " + highScores[i].score;

    highScoresList.appendChild(highScoresListItem);

  }

  let highScoresHomeButton = document.createElement("button");
  highScoresHomeButton.textContent = "Take the Quiz Again";
  highScoresHomeButton.addEventListener("click", function() {createStartPage()});

  let highScoresClearButton = document.createElement("button");
  highScoresClearButton.textContent = "Reset the High Scores";
  highScoresClearButton.addEventListener("click", function() {
    if (highScores.length){

      let clearScores = confirm("Are you sure you want to clear the scores?");
      if (clearScores){
        localStorage.setItem("codingQuizHighScores", "");
        highScores = [];
        createHighScoresPage();
      }
    }
  })

  highScoresPage.appendChild(highScoresH1);
  highScoresPage.appendChild(highScoresList);
  highScoresPage.appendChild(highScoresHomeButton);
  highScoresPage.appendChild(highScoresClearButton);

  mainContent.appendChild(highScoresPage);
}

// Add new score to localStorage
let updateHighScores = function(initialsInput, score) {

  // Pull and parse scores saved in local storage
  if (localStorage.getItem("codingQuizHighScores")){
    highScores = JSON.parse(localStorage.getItem("codingQuizHighScores"));
  }

  let newScore = {"initials": initialsInput, "score": score};

  highScores.push(newScore);
  
  highScores.sort((a, b) => parseInt(b.score) - parseInt(a.score));

  while (highScores.length > 10) {
    highScores.pop();
  }

  localStorage.setItem("codingQuizHighScores", JSON.stringify(highScores))
}


// Fill main section with quiz results
let createResultsPage = function() {
  // Clear mainContent
  clearMainContent();
  
  // Stop and hide
  clearInterval(startTimer)
  timerEl.textContent = "";
  

  // create page elements
  let resultsPage = document.createElement("div");
  
  let resultsH1 = document.createElement("h1");
  resultsH1.textContent = "All done!";
  
  let resultsH2 = document.createElement("h2");
  resultsH2.textContent = "Your final score is " + score + ".";
  
  let inputLabel = document.createElement("label");
  inputLabel.setAttribute("id", "input-label");
  inputLabel.textContent = "Enter initials: "
  
  let initialsInput = document.createElement("input");
  initialsInput.setAttribute("id", "initials-input")
  
  let inputButton = document.createElement("button");
  inputButton.addEventListener("click", function() {updateHighScores(initialsInput.value, score); createHighScoresPage()});
  
  resultsPage.appendChild(resultsH1);
  resultsPage.appendChild(resultsH2);
  resultsPage.appendChild(inputLabel);
  resultsPage.appendChild(initialsInput);
  resultsPage.appendChild(inputButton);
  
  
  mainContent.appendChild(resultsPage);
}

// Fill main section with next question in array
let createQuestionPage = function (questionObject) {
  
  // Check if there is a question left in the array
  if (!questionObject || timer === 0) {
    //    if not, show results
    createResultsPage();
  }
  
  else {
    // Clear mainContent
    clearMainContent();    
    // if so, create a new question page
    let questionPage = document.createElement("div");
    
    let questionText = document.createElement("h2");
    questionText.innerHTML = "<pre>" + questionObject.question + "</pre>";
    
    questionPage.appendChild(questionText);
    // TODO Randomize question order (keep track of 0 index question)
    for (var j = 0; j < questionObject.answer.length; j++) {
      let answerButton = document.createElement("button");
      answerButton.textContent = questionObject.answer[j];
      answerButton.addEventListener("click", function () {
        if (answerButton.textContent === questionObject.answer[0]){
          answer("Correct!");
        } else {
          answer("Incorrect!");
        }
      });
      
      questionPage.appendChild(answerButton);
    }
    
    mainContent.appendChild(questionPage);
    questionNumber++;
  }
}

// Timer functionality
let runTime = function () {
  timer--;
  timerEl.textContent = "Timer " + timer
}

// Begins the quiz
let runQuiz = function() {
  
  //Start Timer Countdown
  timer = 100
  timerEl.textContent = "Timer " + timer
  startTimer = setInterval(runTime, 1000);
  
  createQuestionPage(QUIZ_ARRAY[questionNumber]);
}

// Fill the main section with the welcome and start quiz section
let createStartPage = function () {
  // Clear mainContent
  clearMainContent();

  questionNumber = 0;
    
  let startPage = document.createElement("div");
  
  let startH1 = document.createElement("h1");
  startH1.textContent = "Coding Quiz Challenge"
  
  let startH2 = document.createElement("h2");
  startH2.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!"
  
  let startButton = document.createElement("button");
  startButton.textContent = "Start Quiz"
  startButton.addEventListener("click", runQuiz);
  
  startPage.appendChild(startH1);
  startPage.appendChild(startH2);
  startPage.appendChild(startButton);
  
  mainContent.appendChild(startPage);
}

createStartPage();