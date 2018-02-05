const router = require('express').Router();
const topicCtrl = require('./topics.controller');

/**
 * Effective URL is POST /products/
 *
 * This API adds a new product to the catalog
 */
router.post('/', function(req, res) {
  try {
    let newTopic = req.body;
    topicCtrl.addNewTopic(newTopic, function (err, result) {
      if (err) {
        console.error('Error in adding new topics, ERROR::', err);
        // res.status(400).send(err);
        res.status(400).send({ error: 'Something went wrong, please check and tray again..!' });
        return;
      }
      res.status(201).send(result);
      return;
    });

  } catch (err) {
    console.error('Unexpected error in adding new topics, ERROR::', err);
    res.status(500).send({ error: 'Unexpected internal error, please try later..!' });
    return;
  }
});

router.get('/', function(req, res) {
  try {
    topicCtrl.getAllTopics(function (err, result) {
      if (err) {
        console.error('Error in GET of topics, ERROR::', err);
        res.status(400).send({error: 'Something went wrong, please try later..!'});
        return;
      }
      res.send(result);
      return;
    })
  } catch (err) {
    console.error('Unexpected error in GET of topics, ERROR::', err);
    res.status(500).send({ error: 'Unexpected internal error, please try later..!' });
    return;
  }
});


router.get('/:name', function(req, res) {
  try {
    let topicName = req.params.name;
    topicCtrl.getTopic(topicName, function (req, err, result) {
      if (err) {
        console.error('Error in GET of topic, ERROR::', err);
        res.status(400).send({error: 'Something went wrong, please try later..!'});
        return;
      }
      res.send(result);
      return;
    })
  } catch (err) {
    console.error('Unexpected error in GET of topic, ERROR::', err);
    res.status(500).send({ error: 'Unexpected internal error, please try later..!' });
    return;
  }
});

module.exports = router;
