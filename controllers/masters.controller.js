var express = require('express')
var router = express.Router()
var auth = require('./checkAuth.controller')
var checkAuthenticated = auth.checkAuthenticated

var Master = require('../models/Master')
var City = require('../models/City')
Master.belongsTo(City, { foreignKey: 'cityId' })

router.get('/', getAllMasters)
router.post('/', checkAuthenticated, createNewMaster)
router.put('/:id', checkAuthenticated, editMaster)
router.delete('/:id', checkAuthenticated, deleteMaster)

module.exports = router

// Functions
// Get all masters request hendling
async function getAllMasters (req, res) {
  try {
    await
    Master.findAll({ include: [City] }).then(result => {
      // console.log(result)
      res.status(200).send(result)
    })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

// Create new master request hendling
async function createNewMaster (req, res) {
  try {
    console.log('Master creation request')
    Master.build({
      masterName: req.body.masterName,
      cityID: req.body.cityID,
      masterRating: req.body.masterRating
    })
      .save()
      .then(result => {
        // if successfully saved send status 201
        res.status(201).send(result)
      })
      .catch(error => {
        // if some errors - throw them to further handle
        throw error
      })
  // errors hendling send status 500
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

// Edit master request hendling
async function editMaster (req, res) {
  try {
    console.log('body ', req.body)
    console.log('id  ', req.params.id)
    Master.findById(req.params.id).then(master => {
      master.update({
        masterName: req.body.masterName,
        cityID: req.body.cityID,
        masterRating: req.body.masterRating
      }).then(result => {
      // if successfully saved send status 201
        return res.status(200).send(result)
      })
    })
      .catch(error => {
      // if some errors - throw them to further handle
        throw error
      })
  // errors hendling send status 500
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

// Delete master request hendling
async function deleteMaster (req, res) {
  try {
    console.log('Master delete request')
    Master.destroy({
      where: {
        ID: req.params.id
      }
    }).then(result => {
      // console.log(result)
      return res.sendStatus(204)
    })
      .catch(error => {
        // if some errors - throw them to further handle
        throw error
      })
  // errors hendling send status 500
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}
