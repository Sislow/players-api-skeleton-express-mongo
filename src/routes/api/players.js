const Boom = require('boom');
const jwtsecret = "jwtsecrethere";
const jwt = require('jsonwebtoken');
const { Router } = require('express');

const mongoose = require('mongoose');
const { Player } = require('../../models');


const router = new Router();

router.post('/', (req, res, next) =>{
  const { first_name, last_name } = req.body;
  if(!req.body.token || req.body.token == "") {
    res.status(409).send();
  } else {
      Player.findOne({first_name: req.body.first_name}, function(err, player) {
      if(!err) {
        res.status(409).send();
      }
      if(player!==null){
        res.status(409).send();
      } else {
        req.body.created_by = req.headers.authorization;
         const player = new Player(req.body);
         player
           .save()
           .then(() => {
             res.status(201).send({
               success: true,
               player
             });
           }).catch(next);
      }
    })
  }
});

router.get('/', (req, res, next) =>{
  var empty = [];
  if(!req.headers.authorization || req.headers.authorization == "") { res.status(409).send(); };

  Player.find(function (err, player) {
      if(!err) {
        console.log("Player", JSON.stringify(player));
        res.status(200).send({
          success: true,
          token: getToken(player._id),
          players });
      } else if (!Array.isArray(players) || !players.length) {
        res.status(200).send({
          success: true,
          empty });
      } else {
        res.status(409).send();
      }
  });
});

router.delete('/:id', (req, res, next) =>{
  if(!req.headers.authorization) { res.status(403).send(); };
  Player.findOne({_id: req.params.id}).remove(function (err, player) {
      if(!err && player) {
        res.status(200).send({success:true, player});
      } else {
        res.status(404).send();
      }
  });
});

const getToken = player => jwt.sign({ playerId: player._id }, jwtsecret);

module.exports = router;
