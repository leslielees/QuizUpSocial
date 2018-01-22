const playerService = require('./players.service');

let PlayerController = {
    createPlayerProfile: function(playerDetails, onComplete) {
        playerService.createPlayerProfile(playerDetails,onComplete);
    },
    getPlayers: function(filterParams, onComplete) {
        playerService.getPlayers(filterParams, onComplete);
    },
    getPlayerById: function (playerId, onComplete) {
        playerService.getPlayerById(playerId, onComplete);
    },
    updatePlayerDetails: function (playerId, playerDetails, onComplete) {
        playerService.updatePlayerDetails(playerId, playerDetails, onComplete);
    }
}

module.exports = PlayerController;