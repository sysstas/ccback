const express = require('express')
const router = express.Router()
const auth = require('../services/checkAuth.service')
const checkAdminAuthorization = auth.checkAdminAuthorization

const Master = require('../models/master')
const City = require('../models/city')

router.get('/', getAllMasters)
router.post('/', checkAdminAuthorization, createNewMaster)
router.put('/:id', checkAdminAuthorization, editMaster)
router.delete('/:id', checkAdminAuthorization, deleteMaster)

module.exports = router

// Functions
// Get all masters request hendling
async function getAllMasters (req, res) {
  try {
    const result = await Master.findAll({
      include: { model: City, paranoid: false }
    })
    res.status(200).send(result)
  } catch (error) {
    console.log(error)
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
    const result = await Master.update(
      {
        masterName: req.body.masterName,
        cityId: req.body.cityID,
        masterRating: req.body.masterRating
      },
      { where: { id: req.params.id } }
    )
    // if successfully saved send status 200
    res.status(200).send(result)
  } catch (err) {
    res.sendStatus(500)
  }
}

// Delete master request hendling
async function deleteMaster (req, res) {
  try {
    await Master.destroy({ where: { ID: req.params.id } })
    res.sendStatus(204)
  } catch (err) {
    res.sendStatus(500)
  }
}
