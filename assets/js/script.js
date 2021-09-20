const QUIZ_ARRAY = [
  {
    question:"If you type the following code in the console window, what result will you get?\n3 > 2 > 1 === false;", 
    answer: ["true", "false"]
  }, {
    question: "JavaScript is a _____-side programming language.", 
    answer: ["Both","Client","Server", "None"]
  },{
    question: "Which of the following will write the message 'Hello DataFlair!' in an alert box?",
    answer: ["alert('Hello DataFlair!');", "alertBox('Hello DataFlair!');", "alert(Hello DataFlair!);", "msgAlert('Hello DataFlair!');"]
  },{
    question: "How do you find the minimum of x and y using JavaScript?",
    answer: ["Math.min(x,y)", "min(x,y);", "Math.min(xy)", "min(xy);"]
  },{
    question: "Which of the following statements will throw an error?",
    answer: ["var fun = function bar{ }", "var fun = function bar( ){ }", "function fun( ){ }"]
  },{
    question: "If the value of x is 40, then what is the output of the following program?\n(x % 10 == 0)? console.log(“Divisible by 10”) : console.log(“Not divisible by 10”);",
    answer: ["Divisible by 10", "ReferenceError", "Not divisible by 10", "None of the above"]
  },{
    question: "Which JavaScript label catches all the values, except for the ones specified?",
    answer: ["default", "catch", "label", "try"]
  },{
    question: "Which are the correct 'if' statements to execute certain code if 'x' is equal to 2?",
    answer: ["if(x == 2)", "if(x 2)", "if(x = 2)", "if(x != 2 )"]
  },{
    question: "What will the code return?\nBoolean(3 < 7)",
    answer: ["true", "false", "NaN", "SyntaxError"]
  },{
    question: "What is the output of the following code in the console?\nvar x = 0;\nfunction fun(){\n\t++x;\n\tthis.x = x;\n\treturn x;\n}\nvar bar = new new fun;\nconsole.log(bar.x);",
    answer: ["TypeError", "ReferenceError", "undefined", "1"]
  },{
    question: "Which is the correct JavaScript syntax to change the HTML content given below?\n<p id=”test”>Hello World!</p>",
    answer: ["document.getElementById(“test”).innerHTML = “Hello DataFlair!”;", "document.getElementsById(“test”).innerHTML = “Hello DataFlair!”;", "document.getElementById(test).innerHTML = “Hello DataFlair!”;", "document.getElementByTagName(“p”)[0].innerHTML = “Hello DataFlair!”;"]
  }
];

let mainContent = document.getElementById("page-content");
let timerEl = document.getElementById("timer");
let footer = document.getElementById("answer-result");
let timer = 0;
let score = 0;
let questionNumber = 0 ;
let startTimer;

// When user answers correctly
let correctAnswer = function () {
  score = timer;
  footer.innerHTML = "Correct!"
  setTimeout( () => {footer.innerHTML = ""},   1000);
  createQuestionPage(QUIZ_ARRAY[questionNumber]);
}

// When user answers incorrectly
let incorrectAnswer = function () {
  timer = timer - 5;
  score = timer;
  footer.innerHTML = "Incorrect"
  setTimeout( () => {footer.innerHTML = ""},   1000);
  createQuestionPage(QUIZ_ARRAY[questionNumber]);
}

// Fill main section with score results
let resultsPage = function() {
  clearInterval(startTimer)
  timerEl.textContent = "";
  let resultsText = document.createElement("h2");
  resultsText.textContent = "Done with a score of " + score;
  
  mainContent.appendChild(resultsText);
}

// Fill main section with next question in array
let createQuestionPage = function (questionObject) {
  
  // Clear last page
  while (mainContent.firstChild){
    mainContent.removeChild(mainContent.firstChild);
  }
  
  // Check if there is a question left in the array - if not go to results
  if (!questionObject || timer === 0) {
    resultsPage();
  }
  

  else {
    // Create question page
    let questionPage = document.createElement("div");
    
    let questionText = document.createElement("h2");
    questionText.textContent = questionObject.question;
    
    questionPage.appendChild(questionText);
    // TODO Randomize question order (keep track of 0 index question)
    for (var j = 0; j < questionObject.answer.length; j++) {
      let answerButton = document.createElement("button");
      answerButton.textContent = questionObject.answer[j];
      answerButton.addEventListener("click", function () {
        if (answerButton.textContent === questionObject.answer[0]){
          correctAnswer();
        } else {
          incorrectAnswer();
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
  startTimer = setInterval(runTime, 1000);
  timerEl.textContent = "Timer " + timer
    
  createQuestionPage(QUIZ_ARRAY[questionNumber]);
}

// Fill the main section with the welcome and start quiz section
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