const QUIZ_ARRAY = [{question: "Question 1",answer: ["true", "false"]},{question: "Question 2",answer: ["true", "false1", "false2"]},{question: "Question 3",answer: ["true", "false1","false2","false3"]}]
let mainContent = document.getElementById("page-content");
let timerEl = document.getElementById("timer");
let footer = document.getElementById("answer-result");
let timer = 0;
let score = 0;
let questionNumber = 0 ;
let startTimer;

let correctAnswer = function () {
  score = timer;
  footer.innerHTML = "Correct!"
  setTimeout(
    () => {footer.innerHTML = ""}, 
    1000);
    createQuestionPage(QUIZ_ARRAY[questionNumber]);
  }
  
  let incorrectAnswer = function () {
    timer = timer - 5;
    score = timer;
    let incorrectMsg = document.createElement("h3");
    incorrectMsg.textContent = "Incorrect!"
    mainContent.appendChild(incorrectMsg)
    setTimeout(
      () => {createQuestionPage(QUIZ_ARRAY[questionNumber])}, 
      1500);
  }
  
  let resultsPage = function() {
    clearInterval(startTimer)
    timerEl.textContent = "";
    timer
    let resultsText = document.createElement("h2");
    resultsText.textContent = "Done with a score of " + score;

    mainContent.appendChild(resultsText);
  }
  
  let createQuestionPage = function (questionObject) {
    
    // Clear last page
    while (mainContent.firstChild){
      mainContent.removeChild(mainContent.firstChild);
    }
    
    if (!questionObject) {
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
        answerButton.addEventListener("click", correctAnswer);
        
        questionPage.appendChild(answerButton);
      }
      
      mainContent.appendChild(questionPage);
      questionNumber++;
    }
  }
  
  
  let runTime = function () {
    timer--;
    timerEl.textContent = "Timer " + timer
  }
  
  let runQuiz = function() {
    
    //TODO: Start Timer Countdown
    timer = 100
    startTimer = setInterval(runTime, 1000);
    timerEl.textContent = "Timer " + timer


    
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