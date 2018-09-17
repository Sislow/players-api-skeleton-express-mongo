const Boom = require('boom');
const jwtsecret = "jwtsecrethere";
const jwt = require('jsonwebtoken');
const { Router } = require('express');

const mongoose = require('mongoose');
const { User } = require('../../models');
const router = new Router();

router.post('/', (req, res, next) => {
  const { email, password } = req.body;
  if (!password || !email) throw Boom.conflict('Required missing');

  console.log("login reached");

  User.findOne({'email':email, 'password':password}, function (err, user){
    if(user != null){
      res.status(200).send({
        success: true,
        token: getToken(user._id),
        user });
    }
    else {
      res.status(401).send();
    }
  });
});

const getToken = user => jwt.sign({ userId: user._id }, jwtsecret);

module.exports = router;
