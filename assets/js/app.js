'use strict';
//https://www.youtube.com/watch?v=BW3SQGF0AAw
//Initial values
let counter = 5;
let currentQuestion = 0;
let score = 0;
let lost = 0; 
let timer; //holds the value of our clock


/**
 * If the timer is over, then go to the next question
 * Next Question
 * preloadImage()
 */
function nextQuestion() {

    const isQuestionOver = (quizQuestions.length - 1) === currentQuestion;

    if(isQuestionOver) {
        //Displaying result when the game is over
        displayResult();
    } else {

        currentQuestion++; 

        loadQuestion();
    }


}

/**
 * Start a 30 seconds timer for user to respond or choose an answer to each question
 */
function timeUp() {
    clearInterval(timer);

    lost++;

    preLoadImage('lost');

    setTimeout(nextQuestion(), 3 * 1000);
}
function countDown() {
    counter--;

    $('#time').html('Timer:' + counter);

    if(counter === 0){
        timeUp();
    }
}


/**
 * Responsible for loading the questions
 * Display the question and the choices in the browser
 * Everytime you load counter will automatically start
 * Load Choices in the browser
 * Load Remaining Questions
 */

function loadQuestion() {
  counter = 5;
  timer = setInterval(countDown, 1000);

  const question = quizQuestions[currentQuestion].question;
  const choices =  quizQuestions[currentQuestion].choices;

  //timer
  $('#time').html('Timer:' + counter);

  //question and calling loadChoices function
  $('#game').html(`
    <h4>${question}</h4>

   
    ${loadChoices(choices)}
    ${loadRemainingQuestion()}
  `);
}

/**
 * 
 * data-answer will hold the value of every single choices 
 */
function loadChoices(choices) {
  let result = '';

  for(let i=0; i<choices.length; i++ ){
    result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;   //when it loops it will keep adding p tag
  }

  return result;
}

/**
 * Either correct/wrong choice selected, proceed to the next question
 * Event Delagation
 * document - It means we need to listen to the entire DOM element 
 * Before loading the next question  we will call the preLoadImage(), with 3 seconds delay
 */

$(document).on('click', '.choice', function() {
  clearInterval(timer);

  const selectedAnswer = $(this).attr('data-answer'); //get that value that user selected
  const correctAnswer = quizQuestions[currentQuestion].correctAnswer; //getting the correct answer

  if(correctAnswer === selectedAnswer){ //checking if user is corect or not
    //score increment then proceed to the next question
    score++;

    setTimeout(nextQuestion(), 3 * 1000);

    preLoadImage('win');
    
  } else {
    //lost decrement then proceed to the next question
    lost++;

   
    setTimeout(nextQuestion(), 3 * 1000);

    preLoadImage('lost');
  }

});

/**
 * Display Result After User is done playing
 * This function is called when game is over
 */
function displayResult() {
    const result = `
        <p>You get ${score} question(s) right</p>
        <p>You get ${lost} question(s) wrong</p>
        <p>You answer ${quizQuestions.length} question(s) </p>
        <button class="btn btn-primary" id="reset" >Reset Game</button>
    `;

    $('#game').html(result);
}

//Reset Button
$(document).on('click', '#reset', function() {
 counter = 30;
 currentQuestion = 0;
 score = 0;
 lost = 0; 
 timer = null; 

 loadQuestion();

});

/**
 * Loading Remaining Question
 */

 function loadRemainingQuestion() {
    const remainingQuestion = quizQuestions.length - (currentQuestion + 1);
    const totalQuestion = quizQuestions.length;

    return `Remaining Question: ${remainingQuestion}/${totalQuestion}`;
 }

/**
 * 
 * For random Images
 */

 function randomImage(images) {
     const random = Math.floor(Math.random() * images.length);
     const randomImage = images[random];
     console.log(randomImage);
     return randomImage;
 }


 /**
  * Display a funny giphy for correct and wrong answer
  * status if win or loss
  */

 function preLoadImage(status) {
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if(status === 'win') {
        $('#game').html(`
        console.log('winnnnn');
            <p class = "preload-image"> Congratulations, you pick the correct answer </p>
            <p class = "preload-image"> The correct answer is <b>${correctAnswer}</b> </p>
            <img src="${randomImage(winImages)}"/>
        `);
    } else {
        $('#game').html(`
        console.log('lost');
            <p class="preload-image"> The correct answer was <b>${correctAnswer}</b></p>
            <p class="preload-image"> You lost pretty bad</p>
            <img src="${randomImage(lostImages)}"/>
        `);
    }

 }


$('#start').click(function() {
    $('#start').remove();
    $('#time').html(counter);
    loadQuestion();
});