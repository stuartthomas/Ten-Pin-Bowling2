function Controller() {
  // This creates an array of player objects
  this.players = [];
  this.currentPlayer = 0;
  this.rollInFrame = 0;
}

Controller.prototype.addPlayer = function(name) {
  // Ensure provided player name is not empty
  if(name && name != '' && !name.match(/^ *$/)) {
    // Ensure no more than 6 players are entered. 
    if(this.players.length < 6) {
      // This instantiates a new Player (bowler) object
      this.players.push(new Player(name));
      return true;
    } else {
      return false;
    }
  }
}

Controller.prototype.getPlayers = function() {
  return this.players.map(function(e) { return e.name; });
}

Controller.prototype.getScores = function(player) {
  return this.players[player].getRolls();
}

Controller.prototype.getFrames = function(player) {
  return this.players[player].getFrames();
}

Controller.prototype.addScore = function(score) {
  // Retrieve score value as an integer
  var scoreVal = parseInt(score);

  var player = this.players[this.currentPlayer];

  // Ensure score is between 0 & 10
  if(scoreVal >= 0 && scoreVal <= 10) {

    // Add score
    if(!player.addScore(scoreVal))
      return false;

    // End of Frame? Then move to next player
    if(player.isFrameOver()) {
      this.currentPlayer++;
      if(this.currentPlayer >= this.players.length) {
        this.currentPlayer = 0; 
      }
    }

    return true;
  } else {
    return false;
  }
}



Controller.prototype.getTotal = function(player) {
  // Returns score of the provided player
  return this.players[player].getScore();
}

Controller.prototype.getCurrentPlayer = function() {
  // Returns index of the provided player
  return this.currentPlayer;
}

Controller.prototype.getCurrentRoll = function() {
  // Returns index of current roll (next roll to be made) of the provided player
  return this.players[this.currentPlayer].getRolls().length;
}

Controller.prototype.isGameOver = function() {
  // Ensure last player has finished
  return this.players[this.players.length - 1].isGameOver();
}

Controller.prototype.getWinner = function() {
  // When the game isn't finished we don't have a winner
  if(!this.isGameOver())
    return false;

  var winner;

  // Search for bowler with highest score
  this.players.forEach(function(player) {
    if(!(winner && winner.getScore() > player.getScore()))
      winner = player;
    })

  return winner.name;
}
