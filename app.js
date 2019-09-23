'use strict';

function generateCorrectAnswerSlide(question) {
    $('h1').hide();
    $('h4').hide();

    $('#game').html(`<p class = "preload-image" > Congratulations, you picked the correct answer!!!</p>
            <img src="${randomImage(winImages)}"/> <button id="nextQuestion" class="btn btn-next">Next &raquo;</button>`);
            //<p class = "preload-image"> The correct answer is :<b>${question.correctAnswer}</b></p>
}
function generateIncorrectAnswerSlide(question){
    $('h1').hide();
    $('h4').hide();

    $('#game').html(`<p class="preload-image"> The correct answer was : <b>${question.correctAnswer}</b></p>
    <img src="${randomImage(lostImages)}"/> <button id="nextQuestion" class="btn btn-next">Next &raquo;</button>`);
//<p class="preload-image">Better luck next time!!!</p>
}
function generateQuestionElement(question) {

    return `<ul id="${question.id}" class="wrapper" > ` 
    + `<h2>` + question.question + `</h2>` + generateChoicesString(question.choices, question.id) +
    `<button type="submit" class="btn btn-submit">Submit</button></ul>`;

}

function generateChoiceElement(choice, id) {
    return `<li class="form-row"><input type="radio" class="choice" name="` + id + `" value="${choice}">${choice}</input></li>`;
}

function generateChoicesString(choicesList, id) {
    const choices = choicesList.map((choice) => generateChoiceElement(choice, id));
    return choices.join('');
}
function generateScoreElement(score) {

return `SCORE: `+score;
}
function generateQuestionsLeftElement(questionsLeft) {
    //console.log(questionsLeft);
    //return `<li class="form-row"><h6><b>`+questionsLeft+`/`+quizQuestions.length+`</b> questions left</h6></li>`
    //console.log(`Questions left: ` +questionsLeft+`/`+quizQuestions.length);

        //console.log('return in questionleft')
        return `Questions left: ` +questionsLeft+`/`+quizQuestions.length;

    
    
}

function renderQuizApp(score, questionsDone) {
    $('.btn-primary').hide();
    $('.game-form').show(); //showing the game form

    const activeQuestions = quizQuestions.filter((question) => !(!!questionsDone.find((finQuestion) => (finQuestion === question.id))));
    const questionsLeft = activeQuestions.length;
    $('#quesLeft').html(generateQuestionsLeftElement(questionsLeft));
    if(activeQuestions.length > 0) {
        const currentQuestion = activeQuestions[Math.floor(Math.random() * activeQuestions.length)];
        const questionsListItemsString = generateQuestionElement(currentQuestion);
        $('h1').css('font-size', 40);
        $('h1').css('padding', 30);
        $('h1').text(generateScoreElement(score));
        
        $('h4').css('font-size', 30);
        $('.quiz-title').css('padding-bottom', 20);
        $('h4').text(generateQuestionsLeftElement(quizQuestions.length - questionsDone));
        $('#game').html(questionsListItemsString);
    } else {
       $('#game').html(displayResult(score, quizQuestions.length - score));
       handleReset();
    }
    //console.log(quizQuestions[Math.floor(Math.random()*quizQuestions.length)]);

}
/**
 * Display Result After User is done playing
 * This function is called when game is over
 */
function displayResult(score, lost) {
 
    $('h1').css('visibility', 'hidden');
    $('h4').css('visibility', 'hidden');
        return `
        <p class = "result-title">Quiz challenge results<br></p>
        <p class="result">You got <b>${score}</b> question(s) right</p>
        <p class="result">You got <b>${lost}</b> question(s) wrong</p>
        <p class="result">You answered <b>${quizQuestions.length}</b> questions </p>
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
        $('h1').show();
        $('h4').show();
        $('h1').text(generateScoreElement(score));
        $('h4').text(generateQuestionsLeftElement());
        renderQuizApp(score, questionsDone);

    });
}
function handleReset(){

    $('#reset').click( function () {
        $('h1').css('visibility','visible');
        $('h4').css('visibility','visible');
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
             //added for showing score
            
            $('h1').text(generateScoreElement(score));
            

            handleScore(score);
           

            generateCorrectAnswerSlide(currentQuestion);
        } else {

            generateIncorrectAnswerSlide(currentQuestion);
        }

        //To Do for dispaying questionsleft
        $('h4').text(generateQuestionsLeftElement());

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