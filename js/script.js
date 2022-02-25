const guessLetElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuess = document.querySelector(".remaining");
const remainingGuessSpan = document.querySelector(".remaining, span");
const messageForGuesses = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

//"magnolia" is the starting word to test the game
let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function() {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();  //using .text() instead of .json()
    //console.log(words);
    const wordArray = words.split("\n");
    //console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeHolder(word);
    
};
getWord();


// use an array then join it back to a string
const placeHolder = function (word) {
    const holderLetters = [];
    for (const letter of word) {
        //console.log(letter);
        holderLetters.push("●");
    }
    wordInProgress.innerText = holderLetters.join("");
    
};


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
        updateGuesses(guess);
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

const updateWord = function (guessedLetters) {
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


const updateGuesses = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        messageForGuesses.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        messageForGuesses.innerText = `Good guess! The word has the letter ${guess}`;
        //remainingGuesses -= 1; commented this out so the player doesn't lose a turn for guessing a correct letter
    }

    if (remainingGuesses === 0) {
        messageForGuesses.innerHTML = `Game Over! The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessSpan.innerText = `${remainingGuesses} guesses`;
    }
    
       
};

const wonTheGame = function() {
    if (word.toUpperCase() === wordInProgress.innerText) {
        messageForGuesses.classList.add("win");
        messageForGuesses.innerHTML =  `<p class="highlight">You guessed the correct word! Congratulations!</p>`;
        startOver();
    }
   
};


const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuess.classList.add("hide");
    guessLetElement.classList.add("hide");
    playAgainButton.classList.remove("hide");

};

playAgainButton.addEventListener("click", function () {

    messageForGuesses.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessSpan.innerText = `${remainingGuesses} guesses`;
    guessLetElement.innerHTML = "";
    messageForGuesses.innerText = "";
    getWord();

    guessButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remainingGuess.classList.remove("hide");
    guessLetElement.classList.remove("hide");
});








