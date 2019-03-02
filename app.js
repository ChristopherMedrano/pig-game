/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastRoll;

// initialize new game
init();

// roll dice
document.querySelector('.btn-roll').addEventListener('click', function(){
  if(gamePlaying){
    // random number
    var dice = Math.floor(Math.random() * 6) + 1;
    var diceTwo = Math.floor(Math.random() * 6) + 1;

    // display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    diceDOM.classList.remove('diceShake');
    // trigger reflow in order to rerun css animation
    void diceDOM.offsetWidth;
    diceDOM.classList.add('diceShake');

    var diceTwoDOM = document.querySelector('.diceTwo');
    diceTwoDOM.style.display = 'block';
    diceTwoDOM.src = 'dice-' + diceTwo + '.png';
    diceTwoDOM.classList.remove('diceShake');
    // trigger reflow in order to rerun css animation
    void diceTwoDOM.offsetWidth;
    diceTwoDOM.classList.add('diceShake');

    // update the round score IF the rolled number was NOT a 1
    if(dice === 6 && lastRoll === 6){
      // player loses score if rolls two 6
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
      nextPlayer();
    } else if(dice !== 1 && diceTwo !== 1){
      // add score
      roundScore += dice + diceTwo;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }else{
      // next player
      nextPlayer();
    }

    // save roll of dice
    lastRoll = dice;

  }

});

// hold button
document.querySelector('.btn-hold').addEventListener('click', function(){
  if(gamePlaying){
    // add current score to global scores
    scores[activePlayer] += roundScore;

    // update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // allow user to set winning score
    var input = document.querySelector('.wScore').value;
    var winScore;

    // undefined, 0, null, or "" are COERCED to false
    // anything else coerced to true
    if(input){
      winScore = input;
    } else{
      winScore = 100;
    }

    // check if player won the game
    if(scores[activePlayer] >= winScore){
      // end game
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.diceTwo').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      // next player
      nextPlayer();
    }
  }

});

// switches active player
function nextPlayer(){
  // next player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  lastRoll = 0;

  // reset current score to 0
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // toggle active class between players
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  // hide game dice
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.diceTwo').style.display = 'none';
}

// new game initialization
document.querySelector('.btn-new').addEventListener('click', init);

function init(){
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  // get dice class, use style method to change display property
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.diceTwo').style.display = 'none';

  // sets all scores placeholders to zero
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  // removes all winner and active css classes
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  // sets player 0 to active
  document.querySelector('.player-0-panel').classList.add('active');
}
