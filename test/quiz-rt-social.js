let mongoose = require("mongoose");
let PlayerModel = require('../api/players/players.entity');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Players', () => {
    beforeEach((done) => { //Before each test we empty the database
        PlayerModel.remove({}, (err) => {
           done();
        });
    });
/*
  * Test the /GET route
  */
  describe('/GET players', () => {
      it('it should GET all the Players', (done) => {
        chai.request(server)
            .get('/players')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });


  /*
  * Test the /POST route
  */
  describe('/POST players', () => {
      it('it should not POST a player without pages field', (done) => {
        let player = {
            firstName: "Lord",
            lastName: "Labakdas",
            phone: '0987654321'
        }
        chai.request(server)
            .post('/players')
            .send(player)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                //res.body.errors.should.have.property('pages');
                //res.body.errors.pages.should.have.property('kind').eql('required');
              done();
            });
      });

      it('it should POST a player ', (done) => {
        let player = {
            firstName: 'John',
            lastName: 'Rambo',
            nickname: 'FirstBlood',
            email: 'john@rambo.com',
            phone: '9988776655',
            password: 'qwerty',
            playerId: 1
        }
        chai.request(server)
            .post('/players')
            .send(player)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('_id');
                res.body.should.have.property('nickname');
                res.body.should.have.property('email');
              done();
            });
      });
  });

  /*
  * Test the /GET/:id route
  */
  describe('/GET/:id player', () => {
      it('it should GET a player by the given id', (done) => {
        let player = new PlayerModel()
        player.name.firstName = 'John';
        player.name.lastName = 'Rambo';
        player.nickname = 'FirstBlood';
        player.email = 'john@rambo.com';
        player.phone = '9988776655';
        player.password = 'qwerty';
        player.playerId = 1

        player.save((err, savedDoc) => {
            chai.request(server)
            .get('/players/' + savedDoc.playerId)
            .send(player)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body[0].should.have.property('playerId').eql(savedDoc.playerId);
              done();
            });
        });

      });
  });

  /*
  * Test the /PUT/:id route
  */
  describe('/PUT/:id player', () => {
      it('it should UPDATE a player given the id', (done) => {
        let player = new PlayerModel()
        player.name.firstName = 'John';
        player.name.lastName = 'Rambo';
        player.nickname = 'FirstBlood';
        player.email = 'john@rambo.com';
        player.phone = '9988776655';
        player.password = 'qwerty';
        player.playerId = 1

        player.save((err, savedDoc) => {
                chai.request(server)
                .put('/players/' + savedDoc.playerId)
                .send({firstName: "Rocky", lastName: "Balboa", nickname: "Stallion", passswprd: "rocky@balboa"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('nickname').eql('Stallion');
                  done();
                });
          });
      });
  });




});
