const express = require('express')
const router = express.Router()

const auth = require('./checkAuth.controller')
const checkAuthenticated = auth.checkAuthenticated
const City = require('../models/City')

router.get('/', getAllCities)
router.post('/', checkAuthenticated, createNewCity)
router.put('/:id', checkAuthenticated, editCity)
router.delete('/:id', checkAuthenticated, deleteCity)

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
    const specificCity = await City.findById(req.params.id)
    const result = await specificCity.update({ cityName: req.body.cityName })
    res.status(200).send(result)
  } catch (error) {
    res.sendStatus(500)
  }
}

// Delete city request hendling
async function deleteCity (req, res) {
  try {
    await City.destroy({
      where: {
        ID: req.params.id
      }
    })
    // if successfully deleted send status 204
    res.sendStatus(204)
  } catch (error) {
    res.sendStatus(500)
  }
}
