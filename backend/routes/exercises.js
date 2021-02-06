const router = require('express').Router();
let Exercise = require('../models/exercise.model'); //model

router.route('/').get((req, res) => { //first route (to find exercises)
    Exercise.find()
      .then(exercises => res.json(exercises))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => { //route to add
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration); //convert in Number type
    const date = Date.parse(req.body.date); //convert in Date type

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save() //add
      .then(() => res.json('Exercise added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => { //route to get
    Exercise.findById(req.params.id)
      .then(exercise => res.json(exercise))
      .catch(err => res.status(400).json('Error ' + err));
});

router.route('/:id').delete((req, res) => { //route to delete
    Exercise.findByIdAndDelete(req.params.id)
      .then(() => res.json('Exercise delted.'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => { //route to update
    Exercise.findById(req.params.id)
      .then(exercise => {
          exercise.username = req.body.username;
          exercise.description = req.body.description;
          exercise.duration = Number(req.body.duration);
          exercise.date = Date.parse(req.body.date);

          exercise.save()
            .then(() => res.json('Exercise updated'))
            .catch(err => res.status(400).json('Error ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});







module.exports = router;