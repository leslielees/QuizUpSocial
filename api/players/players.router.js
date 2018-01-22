const router = require('express').Router();
const playerController = require('./players.controller');

router.post("/", function(req, res) {
    try {
        let playerDetails = req.body;
        playerController.createPlayerProfile(playerDetails, function(err, result) {
          if (err) {
            console.error('Error in creating a new player profile, ERROR::', err);
            // res.status(400).send(err);
            res.status(400).send({ error: 'Something went wrong, please check and try again..!' });
            return;
          }
          res.status(201).send(result);
          return;
        })
      } catch (err) {
        console.error('Unexpected error in creating and new player profile, ERROR::', err);
        res.status(500).send({ error: 'Unexpected internal error, please try later..!' });
        return;
      }
});
router.get("/", function(req, res) {
    try {
        let filterParams = req.query;
        playerController.getPlayers(filterParams, function(err, result) {
            if (err) {
                console.error('Error in getting list of players, ERROR::', err);
                res.status(400).send({error: 'Something went wrong, please try later..!'});
                return;
            }
            res.send(result);
            return;
        })
    } catch (err) {
        console.error('Unexpected error in getting list of players, ERROR::', err);
        res.status(500).send({ error: 'Unexpected internal error, please try later..!' });
        return;
    }
});
router.get("/:id", function(req, res) {
    try {
        let playerId = req.params.id;
        playerController.getPlayerById(playerId, function(err, result) {
            if (err) {
                console.error('Error in getting player details by Id, ERROR::', err);
                res.status(400).send({error: 'Something went wrong, please try later..!'});
                return;
            }
            res.send(result);
            return;
        })
    } catch (err) {
        console.error('Unexpected error in getting player details by Id, ERROR::', err);
        res.status(500).send({ error: 'Unexpected internal error, please try later..!' });
        return;
    }
});
router.put("/:id", function(req, res) {
    try {
        let playerId = req.params.id,
            playerDetails = req.body;
        playerController.updatePlayerDetails(playerId, playerDetails, function(err, result) {
            if (err) {
                console.error('Error in updating player details, ERROR::', err);
                res.status(400).send({error: 'Something went wrong, please try later..!'});
                return;
            }
            res.send(result);
            return;
        })
    } catch (err) {
        console.error('Unexpected error in updating player details, ERROR::', err);
        res.status(500).send({ error: 'Unexpected internal error, please try later..!' });
        return;
    }
});

module.exports = router;
