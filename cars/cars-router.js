const express = require('express');

const db = require('../data/connection');

const router = express.Router()

router.get('/', (req, res) => {
  db('carInfo')
    .then(cars => {
    res.json(cars); 
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to retrieve cars' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db('carInfo').where({ id }).first()
  .then(car => {
    res.json(car);
  }) 
  .catch (err => {
    res.status(500).json({ message: 'Failed to retrieve car' });
  });
});

router.post('/', (req, res) => {
  const carData = req.body;

  db('carInfo').insert(carData)
  .then(ids => {
    db('carInfo').where({ id: ids[0] })
    .then(newCar => {
      res.status(201).json(newCar);
    });
  })
  .catch (err => {
    console.log('POST error', err);
    res.status(500).json({ message: "Failed to store data" });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("carInfo")
    .where({ id }) // if not using a where all records will be updated
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(201).json({message: 'car updated successfully'})
      } else {
        res.status(404).json({message: 'no car found'})
      }
    })
    .catch(error => {
      console.log("PUT / error", error)

      res.status(500).json({message: error.message})
  })
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("carInfo")
    .where({ id }) // if not using a where, all records will be removed
    .del() // <----- don't forget this part
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "car deleted successfully" });
      } else {
        res.status(404).json({ message: "no car found" });
      }
    })
    .catch(error => {
      console.log("DELETE / error", error);
      res.status(500).json({ message: error.message });
    });
});


module.exports = router;