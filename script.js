let userChoice = '';
let computerChoice = '';
let playerScore = 0;
let computerScore = 0;

const choices = ['rock', 'paper', 'scissors'];

const timer = {
  timeLeft: 3,
  timerInterval: null,
  start: function () {
    this.reset(); // Reset timer before starting
    this.timerInterval = setInterval(() => {
      document.getElementById('timer').innerHTML = `Time left: ${this.timeLeft}`;
      if (this.timeLeft === 0) {
        clearInterval(this.timerInterval); // Stop the timer
        this.timeLeft = 3;
        if (userChoice === '') {
          alert("Time's up! Point goes to the computer!");
          computerScore++;
          getComputerChoice();
          disableButtons();
        }
        return;
      }
      this.timeLeft--;
    }, 1000);
  },
  reset: function () {
    clearInterval(this.timerInterval);
    this.timeLeft = 3;
    document.getElementById('timer').innerHTML = "Time left: 3";
  }
};

const getUserChoice = (choice) => {
  userChoice = choice;
  document.getElementById('userChoice').innerHTML = `Player selected: ${capitalize(userChoice)}`;
  disableButtons();
  getComputerChoice();
  clearInterval(timer.timerInterval); // Stop timer when user makes a choice
};

const getComputerChoice = () => {
  const randomIndex = Math.floor(Math.random() * choices.length);
  computerChoice = choices[randomIndex];
  document.getElementById('computerChoice').innerHTML = `Computer selected: ${capitalize(computerChoice)}`;
  determineWinner();
};

const determineWinner = () => {
  let result = '';

  // If it's a tie
  if (userChoice === computerChoice) {
    result = 'It\'s a draw!';
  }
  // If player wins
  else if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'rock') ||
    (userChoice === 'scissors' && computerChoice === 'paper')
  ) {
    result = 'You win!';
    playerScore++;
  }
  // If computer wins
  else {
    result = 'The computer wins!';
    computerScore++;
  }

  updateScores(result);
};

const updateScores = (result) => {
  document.getElementById('winner').innerHTML = result;
  document.getElementById("playerScore").innerHTML = `Player score: ${playerScore}`;
  document.getElementById("computerScore").innerHTML = `Computer score: ${computerScore}`;
  
  updateGameLead();
};

const updateGameLead = () => {
  let gameLead = '';
  
  if (playerScore > computerScore) {
    gameLead = `You are leading by ${playerScore - computerScore} point(s)!`;
    document.getElementById('gameLead').innerHTML = gameLead;
  } else if (computerScore > playerScore) {
    gameLead = `The computer is leading by ${computerScore - playerScore} point(s)!`;
    document.getElementById('gameLead').innerHTML = gameLead;
  } else {
    document.getElementById('gameLead').innerHTML = `It’s a tie!`;
  }
};

const resetButton = () => {
  timer.reset();
  userChoice = '';
  computerChoice = '';
  playerScore = 0;
  computerScore = 0;

  document.getElementById('userChoice').innerHTML = 'Your choice goes here...';
  document.getElementById('computerChoice').innerHTML = "The computer's choice goes here...";
  document.getElementById('winner').innerHTML = 'The winner is announced here...';
  document.getElementById('playerScore').innerHTML = 'Player score: 0';
  document.getElementById('computerScore').innerHTML = 'Computer score: 0';
  document.getElementById('gameLead').innerHTML = 'Begin the game to see your progress!';

  document.getElementById('gameLead').className = '';
  document.getElementById('userChoice').className = '';
  document.getElementById('computerChoice').className = '';
  document.getElementById('winner').className = '';
  document.getElementById('playerScore').className = '';
  document.getElementById('computerScore').className = '';

  enableButtons();
};

const startGame = () => {
  userChoice = '';
  timer.start();
  enableButtons();
};

const enableButtons = () => {
  choices.forEach(choice => {
    document.getElementById(`${choice}Select`).disabled = false;
  });
};

const disableButtons = () => {
  choices.forEach(choice => {
    document.getElementById(`${choice}Select`).disabled = true;
  });
};

const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);
