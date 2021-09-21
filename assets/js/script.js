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
      {"text": "Both","correct": "Correct!"}, 
      {"text": "Client","isCorrect": "Incorrect!"}, 
      {"text": "Server","isCorrect": "Incorrect!"}, 
      {"text": "None","isCorrect": "Incorrect!"}
    ]
  },{
    question: "Which of the following will write the message 'Hello Sunshine!' in an alert box?",
    answer: [
      {"text": "alert('Hello Sunshine!');","correct": "Correct!"}, 
      {"text": "alertBox('Hello Sunshine!');","isCorrect": "Incorrect!"}, 
      {"text": "alert(Hello Sunshine!);","isCorrect": "Incorrect!"}, 
      {"text": "msgAlert('Hello Sunshine!');","isCorrect": "Incorrect!"}
    ]
  },{
    question: "How do you find the minimum of x and y using JavaScript?",
    answer: [
      {"text": "Math.min(x,y)","correct": "Correct!"}, 
      {"text": "min(x,y);","isCorrect": "Incorrect!"}, 
      {"text": "Math.min(xy)","isCorrect": "Incorrect!"}, 
      {"text": "min(xy);","isCorrect": "Incorrect!"}
    ]
  },{
    question: "Which of the following statements will throw an error?",
    answer: 
    [
      {"text": "var fun = function bar{ }","correct": "Correct!"}, 
      {"text": "var fun = function bar( ){ }","isCorrect": "Incorrect!"}, 
      {"text": "function fun( ){ }","isCorrect": "Incorrect!"}
    ]
  },{
    question: "If the value of x is 40, then what is the output of the following program?\n(x % 10 == 0)? console.log(“Divisible by 10”) : console.log(“Not divisible by 10”);",
    answer: [
      {"text": "Divisible by 10","correct": "Correct!"}, 
      {"text": "ReferenceError","isCorrect": "Incorrect!"}, 
      {"text": "Not divisible by 10","isCorrect": "Incorrect!"}, 
      {"text": "None of the above","isCorrect": "Incorrect!"}
    ]
  },{
    question: "Which JavaScript label catches all the values, except for the ones specified?",
    answer: [
      {"text": "default","correct": "Correct!"}, 
      {"text": "catch","isCorrect": "Incorrect!"}, 
      {"text": "label","isCorrect": "Incorrect!"}, 
      {"text": "try","isCorrect": "Incorrect!"}
    ]
  },{
    question: "Which are the correct 'if' statements to execute certain code if 'x' is equal to 2?",
    answer: [
      {"text": "if(x == 2)","correct": "Correct!"}, 
      {"text": "if(x 2)","isCorrect": "Incorrect!"}, 
      {"text": "if(x = 2)","isCorrect": "Incorrect!"}, 
      {"text": "if(x != 2 )","isCorrect": "Incorrect!"}
    ]
  },{
    question: "What will the code return?\nBoolean(3 < 7)",
    answer: [
      {"text": "true","correct": "Correct!"}, 
      {"text": "false","isCorrect": "Incorrect!"}, 
      {"text": "NaN","isCorrect": "Incorrect!"}, 
      {"text": "SyntaxError","isCorrect": "Incorrect!"}
    ]
  },{
    question: "What is the output of the following code in the console?\nvar x = 0;\nfunction fun(){\n\t++x;\n\tthis.x = x;\n\treturn x;\n}\nvar bar = new new fun;\nconsole.log(bar.x);",
    answer: [
      {"text": "TypeError","correct": "Correct!"}, 
      {"text": "ReferenceError","isCorrect": "Incorrect!"}, 
      {"text": "undefined","isCorrect": "Incorrect!"}, 
      {"text": "1","isCorrect": "Incorrect!"}
    ]
  },{
    question: "Which is the correct JavaScript syntax to change the HTML content given below?\n<p id=”test”>Hello World!</p>",
    answer: [
      {"text": "document.getElementById(“test”).innerHTML = “Hello Sunshine!”;","correct": "Correct!"}, 
      {"text": "document.getElementsById(“test”).innerHTML = “Hello Sunshine!”;","isCorrect": "Incorrect!"}, 
      {"text": "document.getElementById(test).innerHTML = “Hello Sunshine!”;","isCorrect": "Incorrect!"}, 
      {"text": "document.getElementByTagName(“p”)[0].innerHTML = “Hello Sunshine!”;","isCorrect": "Incorrect!"}
    ]
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
  // if not, show results
  if (!questionObject || timer === 0) {
    createResultsPage();
  }
  
  // if so, create a new question page
  else {
    
    // Clear mainContent
    clearMainContent();    
    
    let questionPage = document.createElement("div");
    
    let questionText = document.createElement("h2");
    questionText.innerHTML = "<pre>" + questionObject.question + "</pre>";
    
    questionPage.appendChild(questionText);
    
    // shuffle answer order
    let baseAnswers = questionObject.answer;
    let shuffledAnswers = baseAnswers;
    shuffle(shuffledAnswers)
    console.dir(baseAnswers);
    console.dir(shuffledAnswers);
    
    for (let i = 0; i < shuffledAnswers.length; i++) {
      let answerButton = document.createElement("button");
      answerButton.textContent = shuffledAnswers[i];
      
      answerButton.addEventListener("click", function () {
        if (answerButton.textContent === baseAnswers[0]){
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

// Array shuffler from https://javascript.info/task/shuffle
function shuffle(array) {
  // debugger;
  shuffledArray = array;
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    
    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

// Begins the quiz
let runQuiz = function() {
  questionNumber = 0;
  
  //Start Timer Countdown
  timer = 100
  timerEl.textContent = "Timer " + timer
  startTimer = setInterval(runTime, 1000);
  
  // Randomize question array
  let randomizedQuestions = shuffle(QUIZ_ARRAY);
  
  createQuestionPage(randomizedQuestions[questionNumber]);
}

// Fill the main section with the welcome and start quiz section
let createStartPage = function () {
  // Clear mainContent
  clearMainContent();
  
  
  
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