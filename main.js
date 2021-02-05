var readlineSync = require("readline-sync");
var randomWords = require("random-words");

let asciiMan = (count) => {
  switch (count) {
    case 6:
      console.log(
        "    ________   \n    |      |    \n    |           \n    |           \n    |           \n    |           \n    |           \n____|___________\n    |         /| \n_____________/ |\n             | | \n_____________|/  \n"
      );
      break;
    case 5:
      console.log(
        "    ________   \n    |      |    \n    |      @    \n    |           \n    |           \n    |           \n    |           \n____|___________\n    |         /| \n_____________/ |\n             | | \n_____________|/  \n"
      );
      break;
    case 4:
      console.log(
        "    ________   \n    |      |    \n    |      @    \n    |      |    \n    |      |    \n    |           \n    |           \n____|___________\n    |         /| \n_____________/ |\n             | | \n_____________|/  \n"
      );
      break;
    case 3:
      console.log(
        "    ________   \n    |      |    \n    |      @    \n    |     /|    \n    |      |    \n    |           \n    |           \n____|___________\n    |         /| \n_____________/ |\n             | | \n_____________|/  \n"
      );
      break;
    case 2:
      console.log(
        "    ________   \n    |      |    \n    |      @    \n    |     /|\\   \n    |      |    \n    |           \n    |           \n____|___________\n    |         /| \n_____________/ |\n             | | \n_____________|/  \n"
      );
      break;
    case 1:
      console.log(
        "    ________   \n    |      |    \n    |      @    \n    |     /|\\   \n    |      |    \n    |     /     \n    |           \n____|___________\n    |         /| \n_____________/ |\n             | | \n_____________|/  \n"
      );
      break;
    case 0:
      console.log(
        "    ________   \n    |      |    \n    |      @    \n    |     /|\\   \n    |      |    \n    |     / \\   \n    |           \n____|___________\n    |         /| \n_____________/ |\n             | | \n_____________|/  \n"
      );
      break;
  }
};

let playAgain = () => {
  let input = readlineSync.question("\nFeel like playing some more?\n");
  if (
    input == "yay" ||
    input == "Yay" ||
    input == "yes" ||
    input == "Yes" ||
    input == "sure" ||
    input == "Sure" ||
    input == "why not" ||
    input == "Why not" ||
    input == "if I have to" ||
    input == "If I have to" ||
    input == "if i have to"
  ) {
    console.clear();
    console.log("Alright! Let me just grab another dude, one sec.\n");
    console.log("[Off in the distance you overhear...]");
    console.log('"Hey! YOU! Yeah, you! Come and play a game with us! Great! Put this bag over your head and we can start."');
    setTimeout(hangman, 10000);
  } else if (input == "nay" || input == "Nay" || input == "no" || input == "No" || input == "naa" || input == "Naa" || input == "no way" || input == "No way") {
    console.clear();
    return console.log("\n\n\nSo long now. If you ever want to play again, give me a shout. Good times.\n\n\n\n\n\n\n\n\n\n\n\n\n");
  }
};

let guessRecursion = (guessesLeft, score, secretWord) => {
  console.clear();
  let guess;
  let guessCount = guessesLeft;
  if (guessCount == 0) {
    asciiMan(guessCount);
    console.log("Ee's dead. Worm food. Going to miss him. At least it's still a nice day.\n" + "Answer was " + secretWord.join("") + ".");
    return playAgain();
  }
  asciiMan(guessCount);
  console.log(score.join(" "));

  if (guessCount > 1) {
    guess = readlineSync.question("Guess again! You have " + guessCount + " chances left.\n");
  } else {
    guess = readlineSync.question("He's looking mighty purple. This is probably your last chance.\n");
  }

  if (secretWord.includes(guess)) {
    for (let index = 0; index < secretWord.length; index++) {
      if (secretWord[index] === guess) {
        score[index] = guess;
      }
    }

    if (score.includes(String.fromCharCode(95))) {
      console.log("\nGOOD GUESS! I guess there's hope for him after all.\n");
    }

    if (!score.includes(String.fromCharCode(95))) {
      console.log("Ahh, shucks. You got it. The word is " + secretWord.join("") + ".");
      console.log("Well, still a nice day I guess. Congratulations! You win. He lives. But if you don't feel like taking him to the hospital let me know.");
      return playAgain();
    }

    guessRecursion(guessCount, score, secretWord);
  } else {
    if (guessCount > 1) {
      console.log("\nHah! What's another one thrown away- still a nice day.\n");
    }
    guessCount--;
    guessRecursion(guessCount, score, secretWord);
  }
};

let hangman = () => {
  let guessCount = 6;
  let secretWord = randomWords({ exactly: 1, maxLength: 7 })[0].split("");

  let score = [];

  for (const letter of secretWord) {
    score.push(String.fromCharCode(95));
  }

  console.log("You have 2 chances to save this man. Let me loosen this a bit- 6 chances to save this man.\n");
  console.clear();

  asciiMan(guessCount);
  console.log(score.join(" "));
  let guessOne = readlineSync.question("Guess a letter.\n");

  if (secretWord.includes(guessOne)) {
    for (let index = 0; index < secretWord.length; index++) {
      if (secretWord[index] === guessOne) {
        score[index] = guessOne;
      }
    }

    if (score.includes(String.fromCharCode(95))) {
      console.log("\nGOOD GUESS! I guess there's hope for him after all.\n");
    }

    guessRecursion(guessCount, score, secretWord);
  } else {
    console.log("\nHah! What's one thrown away. It's still a nice day.\n");
    guessCount--;
    guessRecursion(guessCount, score, secretWord);
  }
};

let gameInit = () => {
  console.clear();
  let welcome = readlineSync.question("Hey, YOU! Yeah, you! Come and save a man from hanging! What say you, yay or nay?\n");

  if (
    welcome == "yay" ||
    welcome == "Yay" ||
    welcome == "yes" ||
    welcome == "Yes" ||
    welcome == "sure" ||
    welcome == "Sure" ||
    welcome == "why not" ||
    welcome == "Why not" ||
    welcome == "if I have to" ||
    welcome == "If I have to" ||
    welcome == "if i have to"
  ) {
    console.log("\nMost good, let us begin. Now, let me just grab my rope...");
    hangman();
  } else if (welcome == "nay" || welcome == "Nay" || welcome == "no" || welcome == "No" || welcome == "naa" || welcome == "Naa" || welcome == "no way" || welcome == "No way") {
    console.log("Alright, I guess I'll let him go. Goodbye.\n");
  }
};

gameInit();
