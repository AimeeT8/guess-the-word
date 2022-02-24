const guess = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuess = document.querySelector(".remaining");
const remainingGuessSpan = document.querySelector(".remaining, span");
const messageForGuesses = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

//"magnolia" is the starting word to test the game
const word = "magnolia";

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
    const guessLetter = textInput.value;
    console.log(guessLetter);
    textInput.value = "";


});




