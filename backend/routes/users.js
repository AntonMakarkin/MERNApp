const router = require('express').Router();
let User = require('../models/user.model'); //model

router.route('/').get((req, res) => { //first route
    User.find() //find all users from db
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => { //route to add
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
      .then(() => res.json('User added'))
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;