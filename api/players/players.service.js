const PlayerModel = require('./players.entity');
const TopicModel = require('../topics/topics.entity');
const PostModel = require('../posts/posts.entity');


/* */
const noError = null;
const PlayerService = {
    createPlayerProfile: function (playerDetails, onCompleteCallback) {
      console.log(playerDetails);
        let player = new PlayerModel();
        player.playerId = playerDetails.playerId;
        player.name.firstName = playerDetails.firstName;
        player.name.lastName = playerDetails.lastName;
        player.nickname = playerDetails.nickname;
        player.email = playerDetails.email;
        player.phone = playerDetails.phone;
        player.password = playerDetails.password;

        player.save(function(err, savedDoc) {
            if (err) {
              console.error("Error in adding new product, ERROR::", err);
              onCompleteCallback(err);
            } else {
              onCompleteCallback(noError, savedDoc);
              return;
            }
        });
    },
    getPlayers: function(filterParams, onCompleteCallback) {
        let query = {},
            page = filterParams.page || 1,
            limit = filterParams.pageSize || 10,
            sortByParam = filterParams.sortBy,
            sortType = (filterParams.sortType === "desc") ? -1  : 1,
            sortBy = {};
        sortBy[sortByParam] = sortType;

        //Query the DB and if no errors, send all the books
        PlayerModel
            .find({})
            .populate("posts")
            .sort(sortBy)
            .skip((page > 0) ? limit * (page - 1) : 0)
            .limit(limit)
            .exec((err, playersCollection) => {
                if (err) {
                    console.error('Error in finding products, ERROR::', err, ' queries for ', query);
                    onCompleteCallback(err);
                    return;
                }
                onCompleteCallback(noError, playersCollection);
                return;
            });
    },
    getPlayerById: function (playerId, onCompleteCallback) {
        PlayerModel
            .find({"playerId": playerId})
            .exec((err, playersCollection) => {
                if (err) {
                    console.error('Error in finding products, ERROR::', err, ' queries for ', query);
                    onCompleteCallback(err);
                    return;
                }
                onCompleteCallback(noError, playersCollection);
                return;
            });
    },
    updatePlayerDetails: function (playerId, playerDetails, onCompleteCallback) {
        let playerData = playerDetails;
        PlayerModel
        .findOne({"playerId": playerId})
        .exec((err, player) => {
            if (err) {
                console.error('Error in finding products, ERROR::', err, ' queries for ', query);
                onCompleteCallback(err);
                return;
            }
            //Object.assign(player, playerDetails);
            if(playerData.firstName)
              player.name.firstName = playerData.firstName;
            if(playerData.lastName)
              player.name.lastName = playerData.lastName;
            if(playerData.nickname)
              player.nickname = playerData.nickname;
            if(playerData.password)
              player.password = playerData.password;

            player.save((err, savedDoc) => {
                if (err) {
                    console.error("Error in updating player details, ERROR::", err);
                    onCompleteCallback(err);
                    return;
                } else {
                    onCompleteCallback(noError, savedDoc);
                    return;
                }
            });
        });
    }
}
module.exports = PlayerService;
