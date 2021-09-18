const QUIZ_ARRAY = [{question: "Question 1",answer: ["true", "false"]},{question: "Question 2",answer: ["true", "false1", "false2"]},{question: "Question 3",answer: ["true", "false1","false2","false3"]}]
let mainContent = document.getElementById("page-content");
let timeScore = 100;
let questionNumber = 0 ;

let correctAnswer = function () {
  let correctMsg = document.createElement("h3");
  correctMsg.textContent = "Correct!"
  mainContent.appendChild(correctMsg)
  setTimeout(
    () => {createQuestionPage(QUIZ_ARRAY[questionNumber])}, 
    1500);
  }
  
  let incorrectAnswer = function () {
    
    createQuestionPage(QUIZ_ARRAY[questionNumber]);
  }
  
  let resultsPage = function() {
    let resultsText = document.createElement("h2");
    resultsText.textContent = "Done with a score of " + timeScore;

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
  
  let runQuiz = function() {
    
    //TODO: Start Timer Countdown
    
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