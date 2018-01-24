const playerService = require('./players.service');

let PlayerController = {
    createPlayerProfile: function(playerDetails, onCompleteCallback) {
        playerService.createPlayerProfile(playerDetails,onCompleteCallback);
    },
    getPlayers: function(filterParams, onCompleteCallback) {
        playerService.getPlayers(filterParams, onCompleteCallback);
    },
    getPlayerById: function (playerId, onCompleteCallback) {
        playerService.getPlayerById(playerId, onCompleteCallback);
    },
    updatePlayerDetails: function (playerId, playerDetails, onCompleteCallback) {
        playerService.updatePlayerDetails(playerId, playerDetails, onCompleteCallback);
    }
}

module.exports = PlayerController;