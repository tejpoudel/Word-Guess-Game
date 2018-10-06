var countries = ["nepal", "india", "united states", "uganda", "china", "chile", "rwanda", "israel", "bhutan", "japan", "france"];
var currentWord = "";
var guessingWord = [];
var blanks = 0;
var blanksAndLetters = [];
var wrongLetters = [];
var tries = 0;
var wins = 0;
var loses = 0;


// use random function to reset game.
function gameBigin() {
    currentWord = countries[Math.floor(Math.random() * countries.length)];
    guessingWord = currentWord.split("");
    blanks = guessingWord.length;
    //Reseting the variables
    tries = 15;
    wrongLetters = [];
    blanksAndLetters = [];

    // replaces success with correct # of blanks
    for (var i = 0; i < blanks; i++) {
        blanksAndLetters.push("_");
    }

    //change html
    document.getElementById("wordToGuess").innerHTML = blanksAndLetters.join(" ");
    document.getElementById("guessesRemaining").innerHTML = tries;
    document.getElementById("totalWins").innerHTML = wins;
    document.getElementById("remainingLetters").innerHTML = wrongLetters.join(" ");

    // debugging
    console.log(currentWord);
    console.log(guessingWord);
    console.log(blanks);
    console.log(blanksAndLetters);
}

// does the letter exist in the word
function checkLetter(letter) {

    var letterInWord = false;

    for (var i = 0; i < blanks; i++) {
        if (currentWord[i] == letter) {
            letterInWord = true;
        }
    }

    // input the letter, if a match add in letter, if does not a match then reduce by 1.
    if (letterInWord) {
        for (var i = 0; i < blanks; i++) {
            if (currentWord[i] === letter) {
                blanksAndLetters[i] = letter;
            }
        }
    }

    else {
        wrongLetters.push(letter);
        tries--;
    }

    // debug
    console.log(blanksAndLetters);
}

// determine win vs loss and sets up the reset of game
function roundComplete() {
    document.getElementById("guessesRemaining").innerHTML = tries;
    document.getElementById("wordToGuess").innerHTML = blanksAndLetters.join(" ");
    document.getElementById("remainingLetters").innerHTML = wrongLetters.join(" ");

    // check wins
    if (guessingWord.toString() == blanksAndLetters.toString()) {
        wins++;
        alert("You won the Game!");

        document.getElementById("totalWins").innerHTML = wins;

        gameBigin();
    }

    //check loses
    else if (tries == 0) {
        loses++;
        alert("You lost the Game, Please try again!")

        gameBigin();
    }
}

//Bigin the game
gameBigin();

// onkeyup event to get letters guessed
document.onkeyup = function (event) {
    var guessingWord = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetter(guessingWord);
    roundComplete();
}



