'use strict';

const quizQuestions = [
    {
        id: cuid(),
        question: 'What is an Object?',
        choices: ['A variable that is a string', 'A key-value pair', 'A number', 'A Boolean', 'An Array'],
        correctAnswer: 'A key-value pair'
    },

    {
        id: cuid(),
        question: 'What is a Factory Function?',
        choices: ['It has a lot of parameters and 1 output', 'It creates functions for the global scope', 'It is meant only for creating objects', 'It uses the lambda expression', 'None of the Above'],
        correctAnswer: 'It is meant only for creating objects'

    },

    // {
    //     id: cuid(),
    //     question: 'What is a DOM?',
    //     choices: ['An HTML element', 'A Javascript library', 'A CSS API', 'An XML element', 'Both A and D'],
    //     correctAnswer: 'Both A and D'
    // },

    // {
    //     id: cuid(),
    //     question: 'What is an Attribute in HTML?',
    //     choices: ['.Attr(parameter1)', 'Additional information about the element', 'Something that describes an Object', 'A subset of a factory function', 'Both A and D'],
    //     correctAnswer: 'Additional information about the element'
    // },

    // {
    //     id: cuid(),
    //     question: 'What does the function For Loop do?',
    //     choices: ['A conditional statement','A while loop', 'It takes an array and modifies each item in the array', 'Iterate through a list given a condition to follow', 'None of the Above'],
    //     correctAnswer: 'Iterate through a list given a condition to follow'

    // },

    // {
    //     id: cuid(),
    //     question: 'What is a function expression?',
    //     choices: ['Its keyword can be used to define a function inside an expression', 'A lambda Expression', 'It can’t be stored in a variable', 'A factory function', 'Both A & C'],
    //     correctAnswer: 'Its keyword can be used to define a function inside an expression'
    // },


    // {
    //     id: cuid(),
    //     question: 'Which one is not a JavaScript event?',
    //     choices: ['Click', 'Keydown', 'Mouseout', 'Load', 'Event delegation'],
    //     correctAnswer: 'Event delegation'

    // },

    // {
    //     id: cuid(),
    //     question: 'What is an event listener?',
    //     choices: ['A primitive Javascript type', 'A place to store data', 'It detects a user’s actions and handle it', 'An HTML Element', 'A callback function'],
    //     correctAnswer: 'It detects a user’s actions and handle it'
    // },

    // {
    //     id: cuid(),
    //     question: 'What is an arrow function?',
    //     choices: ['It takes an array and modifies each item in the array', 'A Lambda Expression', 'It detects a user’s actions and  handle it', 'A compact alternative to a regular function expression', 'Both B & D'],
    //     correctAnswer: 'Both B & D'

    // },

    // {
    //     id: cuid(),
    //     question: 'What’s one of the features of ES6?',
    //     choices: ['‘use strict’', 'Arrow Function', 'Date.now()', 'JSON.parse()', 'Array.forEach()'],
    //     correctAnswer: 'Arrow Function'
    // }
];

const winImages = [
    './images/w1.gif',
    './images/w2.gif',
    './images/w3.gif',
    './images/w4.gif',
    './images/w5.gif',
    './images/w6.gif',
    './images/w7.gif',
    './images/w8.gif',
    './images/w9.gif',
    './images/w10.gif'

];

const lostImages = [
    './images/l1.gif',
    './images/l2.gif',
    './images/l3.gif',
    './images/l4.gif',
    './images/l5.gif',
    './images/l6.gif',
    './images/l7.gif',
    './images/l8.gif',
    './images/l9.gif',
    './images/l9.gif'
];
