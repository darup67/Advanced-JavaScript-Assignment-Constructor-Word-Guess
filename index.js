var inquirer = require('inquirer');
var prompt = require('prompt');

var word = require('./word.js');



var tarantinoMovies = ['Reservior Dogs', 'Pulp Fiction', 'Jackie Brown',
    'Kill Bill Vol. 1', 'Kill Bill Vol. 2', 'Death Proof', 'Inglorious Basterds',
    'Django Unchained', 'The Hateful Eight', 'Once Upon a Time in Hollywood'
];

// INDEX FROM TARANTINO MOVIES ARRAY
var randomIndex = Math.floor(Math.random() * tarantinoMovies.length);
var randomMovie = tarantinoMovies[randomIndex];

// PASSING TARANTINO WORD THROUGH CONSTRUCTOR
computerMovie = new Word(randomMovie);

var requireNewWord = false;

var incorrectLetters = [];
var correctLetters = [];

var guessesLeft = 10;

function knowledge() {
    if (requireNewWord) {
        var randomIndex = Math.floor(Math.random() * tarantinoMovies.length);
        var randomMovie = tarantinoMovies[randomIndex];

        computerMovie = new Word(randomMovie);
        requireNewWord = false;
    }
    var wordComplete = [];
    computerMovie.objArray.forEach(completeCheck);

    if (wordComplete.includes(false)) {
        inquirer.prompt([{
            type: "input",
            message: "Guess a letter of the alphabet!",
            name: "userinput"
        }]).then(function(input) {
            if (!letterArray.includes(input.userInput) || input.userinput.length > 1) {
                console.log(`\n Please try again!\n`);
                knowledge();
            } else {
                if (incorrectLetters.includes(input.userinput) || correctLetters.includes(input.userinput) || input.userinput === '') {
                    console.log(`\n You already guessed that letter or Nothing Entered\n`);
                    knowledge();
                } else {
                    var wordCheckArray = [];

                    computerMovie.userGuess(input.userinput);

                    computerMovie.objArray.forEach(workCheck);
                    if (wordCheckArray.join(' ') === wordComplete.join('')) {
                        console.log(`\nIncorrect\n`);
                        guessesLeft--;
                    } else {
                        console.log(`\nCorrect\n`);
                        correctLetters.push(input.userinput);
                    }
                    computerMovie.log();

                    console.log(`Guesses Left: ` + guessLeft + `\n`);

                    if (guessesLeft > 0) {
                        knowledge();
                    } else {
                        console.log(`Sorry, you lost!\n`);

                        restartGame();
                    }

                    function wordCheck(key) {
                        workCheckArray.push(key.guessed);
                    }
                }
            }
        })
    } else {
        console.log(`YOU WIN\n You know your Quentin Tarantino movies!`);
        restartGame();
    }

    function completeCheck(key) {
        wordComplete.push(key.guessed);
    }
}

function restartGame() {
    inquirer.prompt([{
            type: 'list',
            message: 'Would you like to: ',
            choices: ['Play again', 'Exit'],
            name: 'Restart'
        }])
        .then(function(input) {
            if (input.restart === 'Play Again') {
                requireNewWord = true;
                incorrectLetters = [];
                correctLetters = [];
                guessesLeft = 10;
                knowledge();
            } else {
                return
            }
        })
}
knowledge();