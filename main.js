var readlineSync = require("readline-sync");
var randomWords = require("random-words");

let guessRecursion = (guessesLeft, score, secretWord) => {
  let guessCount = guessesLeft;
  if (guessCount == 0) {
    return console.log("Ee's dead. Worm food. Going to miss him. Still a nice day.");
  }

  let guess = readlineSync.question("Guess again! You have " + guessCount + " chances left.\n");
  console.log(score.join(" "));

  if (secretWord.includes(guess)) {
    console.log("Good guess! I guess there's hope after all.\n");

    for (let index = 0; index < secretWord.length; index++) {
      if (secretWord[index] === guess) {
        score[index] = guess;
      }
    }
    console.log(score.join(" "));
    guessRecursion(guessCount, score, secretWord);
  } else {
    console.log("Hah! What's another one thrown away- still a nice day.");
    guessCount--;
    guessRecursion(guessCount, score, secretWord);
  }
};

let hangman = () => {
  let guessCount = 6;
  let secretWord = randomWords({ exactly: 1, maxLength: 7 })[0].split("");

  let score = [];

  for (const letter of secretWord) {
    score.push("_");
  }

  console.log("You have 2 chances to save this man. Let me loosen this a bit- 6 chances to save this man.\n");
  console.log(score.join(" "));
  let guessOne = readlineSync.question("Guess a letter.\n");

  if (secretWord.includes(guessOne)) {
    console.log("Good guess! I guess there's hope after all.\n");

    for (let index = 0; index < secretWord.length; index++) {
      if (secretWord[index] === guessOne) {
        score[index] = guessOne;
      }
    }
    console.log(score.join(" "));
    guessRecursion(guessCount, score, secretWord);
  } else {
    console.log("Hah! What's one thrown away. It's still a niceday.");
    guessCount--;
    guessRecursion(guessCount, score, secretWord);
  }
};

let gameInit = () => {
  let welcome = readlineSync.question("Hey, you! Come and save a man from hanging! What say you, yay or nay?\n");

  if (welcome == "yay" || welcome == "Yay" || welcome == "yes" || welcome == "Yes" || welcome == "sure" || welcome == "Sure" || welcome == "why not" || welcome == "Why not") {
    console.log("Most good, let us begin. Now, let me just grab my rope...\n");
    hangman();
  } else if (welcome == "nay" || welcome == "Nay" || welcome == "no" || welcome == "No" || welcome == "naa" || welcome == "Naa" || welcome == "no way" || welcome == "No way") {
    console.log("Alright, I guess I'll let him go. Goodbye.\n");
  }
};

gameInit();
