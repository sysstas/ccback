const express = require('express')
const router = express.Router()
const https = require('https')
const paypal = require('paypal-rest-sdk')
router.post('/', pptestfunction)

async function pptestfunction (req, res) {
  try {
    const config = {
      host: 'api.sandbox.paypal.com',
      path: '/v1/oauth2/token',
      port: '',
      client_id: 'AYX-oFJ7-9A2WO4MsT2b2PNfgqvzk3ZHMoIN5HzmcIcBF7Y6dBpn3N1PosyElkwdel8lWi3fGTHEwz6v',
      client_secret: 'EHb0PZrIqF2XQLOCBhEs-rxjS2OX8dJqZRNhjCkzPnMEByJL3VV5xIotBdeimtoRyPPZPoOikxl7Ejzp'
    }
    paypal.authorization.get('', config, (err, res) => {
      console.log(res)
      console.log(err)
    })
    // const options = {
    //   hostname: 'api.sandbox.paypal.com',
    //   // port: 443,
    //   path: '/v1/oauth2/token',
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': ('AYX-oFJ7-9A2WO4MsT2b2PNfgqvzk3ZHMoIN5HzmcIcBF7Y6dBpn3N1PosyElkwdel8lWi3fGTHEwz6v:EHb0PZrIqF2XQLOCBhEs-rxjS2OX8dJqZRNhjCkzPnMEByJL3VV5xIotBdeimtoRyPPZPoOikxl7Ejzp').toString('base64')
    //   }
    // }

    // const req = https.request(options, (res) => {
    //   // console.log('statusCode:', res.statusCode);
    //   // console.log('headers:', res.headers);

    //   res.on('data', (d) => {
    //     process.stdout.write(d)
    //   })
    // })

    // req.on('error', (e) => {
    //   console.error(e)
    // })
    // req.end()

    // // let result
    // const options = {
    //   host: 'api.sandbox.paypal.com',
    //   path: '/v1/oauth2/token',
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'AYX-oFJ7-9A2WO4MsT2b2PNfgqvzk3ZHMoIN5HzmcIcBF7Y6dBpn3N1PosyElkwdel8lWi3fGTHEwz6v:EHb0PZrIqF2XQLOCBhEs-rxjS2OX8dJqZRNhjCkzPnMEByJL3VV5xIotBdeimtoRyPPZPoOikxl7Ejzp'
    //   },
    //   json: true
    // }

    // const req = await https.request(options, (res) => {
    //   let responseString = ''

    //   res.on('data', (data) => {
    //     responseString += data
    //     // save all the data from response
    //   })
    //   res.on('end', () => {
    //     console.log(responseString)
    //     // print to console when response ends
    //   })
    // })
    // req.write()

    //   console.log('SERVER function operates')
    //   await https.get('https://api.sandbox.paypal.com/v1/oauth2/token', (resp) => {
    //     let data = ''
    //     // A chunk of data has been recieved.
    //     resp.on('data', (chunk) => {
    //       data += chunk
    //     })

  //     resp.on('end', () => {
  //       result = JSON.parse(data)
  //       console.log(result)
  //       res.send(result)
  //     })
  //   })
  //   // const resp = await https.post('https://api.sandbox.paypal.com/v1/oauth2/token')
  //   console.log(result)
  //   res.send(result)
  } catch (error) {
    console.log(error)
  }
}

module.exports = router
