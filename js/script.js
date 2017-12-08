var newGameElem = document.getElementById('js-newGameElement');
var newGameBtn = document.getElementById('js-newGameButton');
var gameConsoleDiv = document.getElementById('js-gameConsole');
var winnerIsDisplay = document.getElementById('js-winnerDisplay');

var pickElem = document.getElementById('js-playerPickElement');
var pickRock = document.getElementById('js-playerPick_rock');
var pickPaper = document.getElementById('js-playerPick_paper');
var pickScissors = document.getElementById('js-playerPick_scissors');

var playerPickElem = document.getElementById('js-playerPick');
var computerPickElem = document.getElementById('js-computerPick');

var playerResultElem = document.getElementById('js-playerResult');
var computerResultElem = document.getElementById('js-computerResult');
var resultsElem = document.getElementById('js-resultsTableElement');

var playerNameElem = document.getElementById('js-playerName');
var playerPointsElem = document.getElementById('js-playerPoints');
var computerPointsElem = document.getElementById('js-computerPoints');
var drawsNumber = document.getElementById('js-drawNumber');
var roundNumber = document.getElementById('js-roundNumber');

// EVENT LISTENERS 

newGameBtn.addEventListener('click', newGame);
pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

// VARIABLES

var gameState = 'notStarted';
var player = {
    name: '',
    score: 0
};
var computer = {
    score: 0
};
var gameMaster = {
  round: 0,
  draw: 0,
  gameNumber: 0
};

// FUNCTIONS

function newGame() {
  
  if (gameMaster.gameNumber == 0) {
  player.name = prompt('Please enter your name', 'Player name');
}
  winnerIsDisplay.innerHTML = "";

  if (player.name) {
    player.score = computer.score = gameMaster.draw = gameMaster.round = 0;
    setGamePoints();
    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;
    }
  gameMaster.gameNumber++;
}

function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
        gameConsoleDiv.style.border = 'solid';
      break;
    case 'ended':
        newGameBtn.innerText = 'Play again';
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
    case 'notStarted':
    default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
        gameConsoleDiv.style.border = 'none';
  }
}

function playerPick(playerPick) {
  var computerPick = getComputerPick();

  playerPickElem.innerHTML = playerPick;
  computerPickElem.innerHTML = computerPick;

  checkRoundWinner(playerPick, computerPick);
}

function getComputerPick() {
  var possiblePicks = ['rock', 'paper', 'scissors'];
  return possiblePicks[Math.floor(Math.random()*3)];
}

function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';
  gameMaster.round++;
  winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone';
        gameMaster.draw++;
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
    }
    if (player.score == 10 || computer.score == 10) {
      gameEnd();
    }
    setGamePoints();
    gameConsole();
}

function setGamePoints() {
  playerPointsElem.innerHTML = player.score;
  computerPointsElem.innerHTML = computer.score;
  roundNumber.innerHTML = gameMaster.round;
  drawsNumber.innerHTML = gameMaster.draw;
}

function gameConsole() {
  if (gameState === 'ended') { return; }
  var gameWinner = winnerIs;
  var newElem = document.createElement('p');
  
  var playerWonOutput = "In round " + gameMaster.round + " player has won!";
  var computerWonOutput = "In round " + gameMaster.round +  " computer has won!";
  var drawOutput = "Round " + gameMaster.round +  " was a draw!";
  if (gameWinner == 'player') {
    newElem.innerHTML = playerWonOutput;
  } else if (gameWinner == 'computer') {
    newElem.innerHTML = computerWonOutput;
  } else {
    newElem.innerHTML = drawOutput;
  }
  gameConsoleDiv.appendChild(newElem);
}

function gameEnd() {
    
    player.score == 10 ? winnerIsDisplay.innerHTML = player.name + " won. It took " + gameMaster.round + " rounds": winnerIsDisplay.innerHTML = "Computer won! It took " + gameMaster.round + " rounds";
    gameState = 'ended';
    setGameElements();
// zawsze pozostaje ostatni paragraf 
    gameConsoleDiv.innerHTML = "";
   
    while(gameConsoleDiv.firstChild) {
      gameConsoleDiv.removeChild(gameConsoleDiv.firstChild);
    }
}

function iconSelector() {
  
}

// GAME START

setGameElements();






  

  

  

  

  

 

 