const guessLetElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuess = document.querySelector(".remaining");
const remainingGuessSpan = document.querySelector(".remaining, span");
const messageForGuesses = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

//"magnolia" is the starting word to test the game
const word = "magnolia";
const guessedLetters = [];

// use an array then join it back to a string
const placeHolder = function (word) {
    const holderLetters = [];
    for (const letter of word) {
        console.log(letter);
        holderLetters.push("●");
    }
    wordInProgress.innerText = holderLetters.join("");
    
};
placeHolder(word);

guessButton.addEventListener("click", function (e) {
    //this prevents the default behavior of clicking a button, the form submitting and then reloading the page.
    e.preventDefault();
    //capture the value of the input from user
    messageForGuesses.innerText = "";
    const guess = textInput.value;
    const goodGuess = validateInput(guess);

    if(goodGuess) {
        makeGuess(guess);
    }
    textInput.value = "";

   
});

const validateInput = function (input) {
    //regular expression to ensure the player inputs a letter
    const acceptedLetter = /[a-zA-Z]/;

    if (input.length === 0) {
        messageForGuesses.innerText = "Ooops, you forgot to enter a letter.";

    } else if (input.length > 1) {
        messageForGuesses.innerText = "Please enter a single letter.";

    } else if (!input.match(acceptedLetter)) {
        messageForGuesses.innerText =  "Please enter a letter from A to Z.";

    } else {
        return input;
    }
   

};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        messageForGuesses.innerText = "You have already guessed that letter. Please try again."
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        updatePage();
        updateWord(guessedLetters);
    }
};

const updatePage = function () {
    guessLetElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter; 
        guessLetElement.append(li);
    }
};

const updateWord = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealLetter = [];
    for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
        revealLetter.push(letter.toUpperCase());

    } else {
        revealLetter.push("●");
    }
    }
    //console.log(revealLetter);
    wordInProgress.innerText = revealLetter.join("");
    wonTheGame();

};

const wonTheGame = function() {
    if (word.toUpperCase() === wordInProgress.innerText) {
        messageForGuesses.classList.add("win");
        messageForGuesses.innerHTML =  `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};




