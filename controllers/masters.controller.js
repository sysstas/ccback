const express = require('express')
const router = express.Router()
const auth = require('./checkAuth.controller')
const checkAuthenticated = auth.checkAuthenticated

const Master = require('../models/Master')
const City = require('../models/City')

router.get('/', getAllMasters)
router.post('/', checkAuthenticated, createNewMaster)
router.put('/:id', checkAuthenticated, editMaster)
router.delete('/:id', checkAuthenticated, deleteMaster)

module.exports = router

// Functions
// Get all masters request hendling
async function getAllMasters (req, res) {
  try {
    const result = await Master.findAll({ include: [City] })
    res.status(200).send(result)
  } catch (error) {
    res.sendStatus(500)
  }
}

// Create new master request hendling
async function createNewMaster (req, res) {
  try {
    const result = await Master.build({
      masterName: req.body.masterName,
      cityId: req.body.cityId,
      masterRating: req.body.masterRating
    }).save()
    // if successfully saved send status 201
    res.status(201).send(result)
  } catch (err) {
    res.sendStatus(500)
  }
}

// Edit master request hendling
async function editMaster (req, res) {
  try {
    const master = await Master.findById(req.params.id)
    const result = await master.update({
      masterName: req.body.masterName,
      cityID: req.body.cityID,
      masterRating: req.body.masterRating
    })
    // if successfully saved send status 201
    res.status(200).send(result)
  } catch (err) {
    res.sendStatus(500)
  }
}

// Delete master request hendling
async function deleteMaster (req, res) {
  try {
    await Master.destroy({
      where: { ID: req.params.id }
    })
    res.sendStatus(204)
  } catch (err) {
    res.sendStatus(500)
  }
}
