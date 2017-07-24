var config = require('config.json');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

// routes
router.post('/authenticate', authenticate);

module.exports = router;

function authenticate(req, res) {
    setTimeout(function(){
        if(req.body.username == 'admin' && req.body.password == 'admin'){
    
            res.send({
                user:{

                id: 1,
                userName: "admin",
                FirstName: "Atul",
                LastName: "Bhardwaj"
                },
                access_token: jwt.sign({ sub: 1 }, config.secret)
        });
        } else {
            // authentication failed
            res.status(400).send('Username or password is incorrect');
        }
    }, 2000);
   
};