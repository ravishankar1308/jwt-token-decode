var express = require('express');
var router = express.Router();

var jwt = require("jsonwebtoken");

/* GET users Info with jwt. */
// eg: localhost:3000/user?jwt=<jwt>
router.get('/', function(req, res) {
  const jwtuser =req.query.jwt;
  jwt.verify(jwtuser, 'secret', function (err, decoded) {
    if (err)
      return res.status(500).send({ message: 'Failed to authenticate token.'});

const user=decoded.user;
    // res.render('index', { title: user });
  res.send({UserName:user});
  });
});

/* Create users Info with jwt. */
// eg: localhost:3000/user
router.post('/',  (req, res) => {

  if (!req.body.user) {
     res.status(400).send("");
    return;
  }
  var token = jwt.sign({user: req.body.user}, 'secret',
      {expiresIn: 86400}
  );
  res.status(200).send({ token});
});

module.exports = router;
