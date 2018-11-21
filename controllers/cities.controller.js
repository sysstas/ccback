const express = require('express')
const router = express.Router()

const auth = require('../services/checkAuth.service')
const checkAdminAuthorization = auth.checkAdminAuthorization
const City = require('../models/city')

router.get('/', getAllCities)
router.post('/', checkAdminAuthorization, createNewCity)
router.put('/:id', checkAdminAuthorization, editCity)
router.delete('/:id', checkAdminAuthorization, deleteCity)

module.exports = router

// Functions
// Get all cities request handling
async function getAllCities (req, res) {
  try {
    const cities = await City.findAll()
    res.status(200).send(cities)
  } catch (error) {
    res.sendStatus(500)
  }
}

// Create new city request handling
async function createNewCity (req, res) {
  try {
    const result = await City.build({ cityName: req.body.cityName }).save()
    // if successfully saved send status 201
    res.status(201).send(result)
  } catch (err) {
    res.sendStatus(500)
  }
}

// Edit city request handling
async function editCity (req, res) {
  try {
    await City.update({ cityName: req.body.cityName }, { where: { id: req.params.id } })
    res.status(200).send([1])
  } catch (error) {
    res.sendStatus(500)
  }
}

// Delete city request handling
async function deleteCity (req, res) {
  try {
    await City.destroy({ where: { id: req.params.id } })
    // if successfully deleted send status 204
    res.status(204).send([])
  } catch (error) {
    res.sendStatus(500)
  }
}
