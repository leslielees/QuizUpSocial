const router = require('express').Router();
const postsCtrl = require('./posts.controller');

/**
 * Effective URL is POST /products/
 *
 * This API adds a new product to the catalog
 */
router.post('/', function(req, res) {
  try {
    let newPost = req.body;
    postsCtrl.addPost(newPost, function (err, result) {
      if (err) {
        console.error('Error in saving the post, ERROR::', err);
        // res.status(400).send(err);
        res.status(400).send({ error: 'Something went wrong, please check and tray again..!' });
        return;
      }
      res.status(201).send(result);
      return;
    });

  } catch (err) {
    console.error('Unexpected error in adding new post, ERROR::', err);
    res.status(500).send({ error: 'Unexpected internal error, please try later..!' });
    return;
  }
});

router.get('/', function(req, res) {
  try {
    postsCtrl.getAllPosts(function (err, result) {
      if (err) {
        console.error('Error in saving the post, ERROR::', err);
        // res.status(400).send(err);
        res.status(400).send({ error: 'Something went wrong, please check and tray again..!' });
        return;
      }
      res.send(result);
      return;
    });

  } catch (err) {
    console.error('Unexpected error in adding new post, ERROR::', err);
    res.status(500).send({ error: 'Unexpected internal error, please try later..!' });
    return;
  }
});

router.get('/:id', function(req, res) {
  try {
    //console.log(req.params.id);
    let postId = req.params.id;

    postsCtrl.getPostById(postId, function (err, result) {
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

router.get('/:player', function(req, res) {
  try {
    let playerId = req.params.playerId;

    postsCtrl.getPostsByPlayer(playerId, function (err, result) {
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

router.get('/:topic', function(req, res) {
  try {
    let topicName = req.params.topic;

    postsCtrl.getPostsByTopic(topicName, function (err, result) {
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

module.exports = router;
