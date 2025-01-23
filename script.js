let userChoice = '';
let computerChoice = '';
let playerScore = 0;
let computerScore = 0;
let gameLead = '';

  const timer = {
    timeLeft: 3, //Begins a timer of 2 seconds
    timerInterval: null,

    start: function() {
        this.timerCountdown();
    },

    timerCountdown: function() {
        for (let i = this.timeLeft; i >= 0; i--) {
            setTimeout(() => {
                document.getElementById('timer').innerHTML = `Time left: ${i} seconds`;

                if (i === 0 && userChoice === '') {
                    alert("Time's up! Point goes to the computer!");
                    computerScore++;
                    getComputerChoice();
                }
            }, (this.timeLimit - i) * 1000);
        }
    },

    reset: function () {
    clearInterval(this.timerInterval);
    this.timeLeft = 3;
    document.getElementById('timer').innerHTML = "Time left: 3 seconds";
    
    }
  };

  const getUserChoice = (userInput) => {
    userChoice = userInput;
    if (userChoice === 'Rock') {
      document.getElementById('userChoice').className = 'rockChar';
    } else if (userChoice === 'Paper') {
      document.getElementById('userChoice').className = '';
    } else if (userChoice === 'Scissors') {
      document.getElementById('userChoice').className = 'scissorsChar';
    }
    document.getElementById('userChoice').innerHTML = ('Player selected: ' + userChoice);
    clearInterval(timer.timerInterval);
    getComputerChoice();
}

const getComputerChoice = () => {
    let randomNumber = Math.floor(Math.random() * 3); 
    if (randomNumber === 0) {
      computerChoice = 'Rock';
      document.getElementById('computerChoice').className = 'rockChar';
    } else if (randomNumber === 1) {
      computerChoice = 'Paper';
      document.getElementById('computerChoice').className = '';
    } else if (randomNumber === 2) {
      document.getElementById('computerChoice').className = 'scissorsChar';
      computerChoice = 'Scissors';
    }
    document.getElementById('computerChoice').innerHTML = ('Computer selected: ' + computerChoice);
    determineWinner();
  }

  // determineWinner will value one option over the other, and declare the winner
const determineWinner = () => {
    result = '';

  // Will automatically tie the game if the userChoice is the same as the computerChoice
       if (userChoice === computerChoice) {
          result = 'The game is a draw!';
          document.getElementById('winner').className = '';
        }

    // If a winning character was chosen from the user
    if ((userChoice === 'Rock' && computerChoice === 'Scissors') || (userChoice === 'Paper' && computerChoice === 'Rock') || (userChoice === 'Scissors' && computerChoice === 'Paper')) {
        result = 'You win!';
        document.getElementById('winner').className = 'winnerPlayer';
        console.log(playerScore++);
    }
    

    // If a winning character was chosen from the computer
    if ((userChoice === 'Rock' && computerChoice === 'Paper') || (userChoice === 'Paper' && computerChoice === 'Scissors') || (userChoice === 'Scissors' & computerChoice === 'Rock')) {
        result = 'The computer wins!';
        document.getElementById('winner').className = 'winnerComputer';
        console.log(computerScore++);
    }

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
}
const resetButton = () => {
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
}

const startGame = () => {
    userChoice = '';
    timer.start();
}