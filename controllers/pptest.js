const express = require('express')
const router = express.Router()
const https = require('https')

router.post('/', pptestfunction)

async function pptestfunction (req, res) {
  try {
    let result
    console.log('SERVER function operates')
    await https.get('https://api.sandbox.paypal.com/v1/oauth2/token', (resp) => {
      let data = ''

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk
      })

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        result = JSON.parse(data)
        console.log(result)
        res.send(result)
      })
    }).on('error', (err) => {
      console.log('Error: ' + err.message)
    }) 
    // const resp = await https.post('https://api.sandbox.paypal.com/v1/oauth2/token')
    console.log(result)
    // res.send(result)
  } catch (error) {
    console.log(error)
  }
}

module.exports = router
