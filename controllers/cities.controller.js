const express = require('express')
const router = express.Router()

const auth = require('../services/checkAuth.service')
const checkAdminAuthorization = auth.checkAdminAuthorization
const City = require('../models/City')

router.get('/', getAllCities)
router.post('/', checkAdminAuthorization, createNewCity)
router.put('/:id', checkAdminAuthorization, editCity)
router.delete('/:id', checkAdminAuthorization, deleteCity)

module.exports = router

// Functions
// Get all cities request hendling
async function getAllCities (req, res) {
  try {
    const cities = await City.findAll()
    res.status(200).send(cities)
  } catch (error) {
    res.sendStatus(500)
  }
}

// Create new city request hendling
async function createNewCity (req, res) {
  try {
    const result = await City.build({ cityName: req.body.cityName }).save()
    // if successfully saved send status 201
    res.status(201).send(result)
  } catch (err) {
    res.sendStatus(500)
  }
}

// Edit city request hendling
async function editCity (req, res) {
  try {
    const result = await City.update({ cityName: req.body.cityName }, { where: { id: req.params.id } })
    res.status(200).send(result)
  } catch (error) {
    res.sendStatus(500)
  }
}

// Delete city request hendling
async function deleteCity (req, res) {
  try {
    await City.destroy({ where: { id: req.params.id } })
    // if successfully deleted send status 204
    res.sendStatus(204)
  } catch (error) {
    res.sendStatus(500)
  }
}
