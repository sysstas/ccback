const paypal = require('paypal-rest-sdk')

paypal.configure({
  'mode': process.env.PAYPAL_MODE, // sandbox or live
  'client_id': process.env.PAYPAL_CLIENT_ID, // please provide your client id here
  'client_secret': process.env.PAYPAL_CLIENT_SECRET // provide your client secret here
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

function paymentRefund (ID, data) {
  paypal.sale.refund(ID, data, (err, refund) => {
    if (err) {
      console.log('Refund Error', JSON.stringify(err))
      return
    }
    console.log('Refund Success', JSON.stringify(refund))
  })
}

module.exports = { paymentVerify: paymentVerify, paymentRefund: paymentRefund }
