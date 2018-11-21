const express = require('express')
const router = express.Router()

const auth = require('../services/checkAuth.service')
const checkAdminAuthorization = auth.checkAdminAuthorization
const ServiceItem = require('../models/serviceItem')
const logger = require('../services/logger.service')


router.get('/', getAllItems)
router.post('/', checkAdminAuthorization, createNewItem)
router.put('/:id', checkAdminAuthorization, editItem)
router.delete('/:id', checkAdminAuthorization, deleteItem)

module.exports = router

// Functions
// Get all cities request handling
async function getAllItems (req, res) {
  try {
    // const items = await ServiceItem.findAll({ attributes: ['id', 'clockSize', 'workHours', 'price'] })
    const items = await ServiceItem.getAllSafe()
    res.status(200).send(items)
  } catch (error) {
    logger.error(`Get items error ${error}`)
    res.sendStatus(500)
  }
}

// Create new city request handling
async function createNewItem (req, res) {
  try {
    const result = await ServiceItem.build({
      clockSize: req.body.clockSize,
      workHours: req.body.workHours,
      price: req.body.price
    }).save()
    // if successfully saved send status 201
    res.status(201).send(result)
  } catch (err) {
    res.sendStatus(500)
  }
}

// Edit city request handling
async function editItem (req, res) {
  try {
    await ServiceItem.update({
      clockSize: req.body.clockSize,
      workHours: req.body.workHours,
      price: req.body.price
    }, { where: { id: req.params.id } })
    res.status(200).send([1])
  } catch (error) {
    res.sendStatus(500)
  }
}

// Delete city request handling
async function deleteItem (req, res) {
  try {
    await ServiceItem.destroy({ where: { id: req.params.id } })
    // if successfully deleted send status 204
    res.status(204).send([])
  } catch (error) {
    res.sendStatus(500)
  }
}
