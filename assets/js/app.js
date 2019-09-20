'use strict';
function generateCorrectAnswerSlide(question) {
    $('#game').html(`<p class = "preload-image"> Congratulations, you pick the correct answer </p>
            <p class = "preload-image"> The correct answer is <b>${question.correctAnswer}</b></p>
            <img src="${randomImage(winImages)}"/> <button id="nextQuestion">Next</button>`)
}
function generateIncorrectAnswerSlide(question){
    $('#game').html(`<p class="preload-image"> The correct answer was <b>${question.correctAnswer}</b></p>
        <p class="preload-image"> You lost pretty bad</p>
    <img src="${randomImage(lostImages)}"/> <button id="nextQuestion">Next</button>`)
}
function generateQuestionElement(question) {

    return `<ul id="${question.id}"> ` + question.question + generateChoicesString(question.choices, question.id) +
        `<button type="submit">Submit</button></ul>`;
}

function generateChoiceElement(choice, id) {
    return `<li><input type="radio" class="choice" name="` + id + `" value="${choice}">${choice}</input></li>`;
}

function generateChoicesString(choicesList, id) {
    const choices = choicesList.map((choice) => generateChoiceElement(choice, id))
    return choices.join('');
}
function generateScoreElement(score) {
return `<h4>SCORE: `+score+`</h4>`
}
function generateQuestionsLeftElement(questionsLeft) {
    return `<h6>`+questionsLeft+`/`+quizQuestions.length+` questions left</h6>`
}

function renderQuizApp(score, questionsDone) {
    const activeQuestions = quizQuestions.filter((question) => !(!!questionsDone.find((finQuestion) => (finQuestion === question.id))));
    const questionsLeft = activeQuestions.length;
    $('#quesLeft').html(generateQuestionsLeftElement(questionsLeft));
    if(activeQuestions.length > 0) {
        const currentQuestion = activeQuestions[Math.floor(Math.random() * activeQuestions.length)];
        const questionsListItemsString = generateQuestionElement(currentQuestion);
        $('#game').html(questionsListItemsString);
    } else {
       $('#game').html(displayResult(score, quizQuestions.length - score));
        handleReset();
    }
    console.log(quizQuestions[Math.floor(Math.random()*quizQuestions.length)]);

}
/**
 * Display Result After User is done playing
 * This function is called when game is over
 */
function displayResult(score, lost) {
    return `<p>You get ${score} question(s) right</p>
        <p>You get ${lost} question(s) wrong</p>
        <p>You answer ${quizQuestions.length} question(s) </p>
        <button class="btn btn-primary" id="reset" >Reset Game</button>
    `;
}


function randomImage(images) {
    const random = Math.floor(Math.random() * images.length);
    const randomImage = images[random];
    return randomImage;
}
function handleNextQuestion(score, questionsDone) {
    $('#nextQuestion').click(function(event) {
        renderQuizApp(score, questionsDone);
    });
}
function handleReset(){
    $('#reset').click( function () {
        handleQuizApp();
    });

}
function handleScore(score){
    $('#score').html(generateScoreElement(score));
}
function handleSubmit(score, questionsDone) {
    $('#game').submit(function(event) {
        event.preventDefault();
        const id = $('#game ul').attr('id');
        const currentQuestion = quizQuestions.find((question) => question.id === id);
        const answer = $(':checked').attr('value');
        questionsDone.push(id);
        if(currentQuestion.correctAnswer === answer) {
            score++;
            handleScore(score);
            generateCorrectAnswerSlide(currentQuestion);
        } else {
            generateIncorrectAnswerSlide(currentQuestion);
        }
        handleNextQuestion(score, questionsDone);
    });
}
function handleQuizApp() {
    let score = 0;
    let questionsDone = [];
    renderQuizApp(score, questionsDone);
    handleScore(score);
    handleSubmit(score, questionsDone);

}

$('#start').click(function () {
    $('#start').remove();
    handleQuizApp();
});