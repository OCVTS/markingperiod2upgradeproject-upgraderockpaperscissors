let userChoice = '';
let computerChoice = '';
let playerScore = 0;
let computerScore = 0;
let gameLead = '';

const choices = ['rock', 'paper', 'scissors'];

const timer = {
  timeLeft: 3,  // Start with 3 seconds instead of 2 to allow a more reasonable countdown
  timerInterval: null,

  start: function () {
    enableButtons();
    this.reset(); // Reset timer before starting
    this.timerInterval = setInterval(() => {
      document.getElementById('timer').innerHTML = `Time left: ${this.timeLeft}`;

      if (this.timeLeft === 0) {
        clearInterval(this.timerInterval); // Stop the timer
        this.timeLeft = 3; // Reset time
        if (userChoice === '') {
          alert("Time's up! Point goes to the computer!");
          computerScore++;
          getComputerChoice();
          disableButtons();
        }
        return;
      }

      this.timeLeft--;
    }, 1000); // Countdown every second
  },

  reset: function () {
    clearInterval(this.timerInterval); // Stop any ongoing timer
    this.timeLeft = 3; // Reset the timeLeft
    document.getElementById('timer').innerHTML = "Time left: 3";
  }
};

const getUserChoice = (choice) => {
  userChoice = choice.charAt(0).toUpperCase() + choice.slice(1);

  document.getElementById('userChoice').innerHTML = 'Player selected: ' + userChoice;
  document.getElementById('userChoice').className = `${choice}Char`;
  clearInterval(timer.timerInterval);

  disableButtons();
  getComputerChoice();
}



const getComputerChoice = () => {
  let randomIndex = Math.floor(Math.random() * 3); 
  computerChoice = choices[randomIndex];
  document.getElementById('computerChoice').innerHTML = ('Computer selected: ' + computerChoice);
  document.getElementById('computerChoice').className = `${computerChoice.toLowerCase()}Char`;
  determineWinner();
}

const determineWinner = () => {
  let result = '';  // Declare result here

  // Check for a draw
  if (userChoice === computerChoice) {
    result = 'The game is a draw!';
    document.getElementById('winner').className = '';
  }

  // If a winning character was chosen from the user
  if ((userChoice === 'Rock' && computerChoice === 'Scissors') ||
      (userChoice === 'Paper' && computerChoice === 'Rock') ||
      (userChoice === 'Scissors' && computerChoice === 'Paper')) {
    result = 'You win!';
    document.getElementById('winner').className = 'winnerPlayer';
    playerScore++;
  }

  // If a winning character was chosen from the computer
  if ((userChoice === 'Rock' && computerChoice === 'Paper') ||
      (userChoice === 'Paper' && computerChoice === 'Scissors') ||
      (userChoice === 'Scissors' && computerChoice === 'Rock')) {
    result = 'The computer wins!';
    document.getElementById('winner').className = 'winnerComputer';
    computerScore++;
  }

  updateGameLead(result);
};

const updateGameLead = (result) => {
  document.getElementById('winner').innerHTML = result;
  document.getElementById("playerScore").innerHTML = `Player score: ${playerScore}`; // Updates player score
  document.getElementById('playerScore').className = 'winnerPlayer';
  document.getElementById("computerScore").innerHTML = `Computer score: ${computerScore}`; // Updates computer score
  document.getElementById('computerScore').className = 'winnerComputer';

  if (playerScore > computerScore) {
    gameLead = playerScore - computerScore;
    if (gameLead === 1) {
      document.getElementById('gameLead').innerHTML = `You are currently winning by ${gameLead} point!`;
      document.getElementById('gameLead').className = 'playerLead';
    } else if (gameLead > 1) {
      document.getElementById('gameLead').innerHTML = `You are currently winning by ${gameLead} points!`;
      document.getElementById('gameLead').className = 'playerLead';
    }
  } else if (computerScore > playerScore) {
    gameLead = computerScore - playerScore;
    if (gameLead === 1) {
      document.getElementById('gameLead').innerHTML = `The computer is winning by ${gameLead} point!`;
      document.getElementById('gameLead').className = 'computerLead';
    } else if (gameLead > 1) {
      document.getElementById('gameLead').innerHTML = `The computer is winning by ${gameLead} points!`;
      document.getElementById('gameLead').className = 'computerLead';
    }
  }

  if (playerScore === computerScore) {
    document.getElementById('gameLead').innerHTML = `Tied for the lead!`;
    document.getElementById('gameLead').className = 'paperChar';
  }
};

const resetButton = () => {
  timer.reset();
  userChoice = '';
  computerChoice = '';
  playerScore = 0;
  computerScore = 0;
  gameLead = '';

  document.getElementById('userChoice').innerHTML = 'Your choice goes here...';
  document.getElementById('computerChoice').innerHTML = "The computer's choice goes here...";
  document.getElementById('winner').innerHTML = 'The winner is announced here...';
  document.getElementById('playerScore').innerHTML = 'Player score: 0';
  document.getElementById('computerScore').innerHTML = 'Computer score: 0';
  document.getElementById('gameLead').innerHTML = 'Begin the game to see your progress!';

  document.getElementById('userChoice').className = '';
  document.getElementById('computerChoice').className = '';
  document.getElementById('winner').className = '';
  document.getElementById('playerScore').className = '';
  document.getElementById('computerScore').className = '';
  document.getElementById('gameLead').className = '';

  // Ensure the game lead shows correctly after reset
  document.getElementById('gameLead').innerHTML = `Tied for the lead!`;
  document.getElementById('gameLead').className = 'paperChar';
}

const startGame = () => {
  userChoice = '';
  timer.start();
  enableButtons();
}

const enableButtons = () => {
  choices.forEach(choice => {
    document.getElementById(`${choice}Select`).disabled = false;
  });
}

const disableButtons = () => {
  choices.forEach(choice => {
    document.getElementById(`${choice}Select`).disabled = true;
  })
}

disableButtons();
