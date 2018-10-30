const paypal = require('paypal-rest-sdk')

paypal.configure({
  'mode': 'sandbox', // sandbox or live
  'client_id': 'AYX-oFJ7-9A2WO4MsT2b2PNfgqvzk3ZHMoIN5HzmcIcBF7Y6dBpn3N1PosyElkwdel8lWi3fGTHEwz6v', // please provide your client id here
  'client_secret': 'EHb0PZrIqF2XQLOCBhEs-rxjS2OX8dJqZRNhjCkzPnMEByJL3VV5xIotBdeimtoRyPPZPoOikxl7Ejzp' // provide your client secret here
})

function paymentVerify (ID, orderId) {
  try {
    return new Promise((resolve, reject) => {
      paypal.payment.get(ID, (error, payment) => {
        if (error) {
          console.log(error)
          console.log('Validation false by error1')
          return resolve(false)
        }
        const order = parseInt(payment.transactions[0].custom)
        if (order === orderId) {
          console.log('Validation true')

          resolve(true)
        }
        console.log(' 1.Validation false')
        resolve(false)
      })
    })
  } catch (err) {
    console.log('Validation false by error')
    console.log(err)
    return new Promise((resolve, reject) => { resolve(false) })
  }
}

module.exports = paymentVerify
