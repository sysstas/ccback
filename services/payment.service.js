// ((paymentService, paypal) => {
//   require('./paypal.controller.js').SetConfig(paypal)
//
//   paymentService.CreateItemObj = (name, price, quantity) => {
//     const itemObj = {
//       name,
//       price,
//       quantity,
//       currency: 'USD'
//     }
//     return itemObj
//   }
//
//   paymentService.CreateTransactionObj = (tax, shipping, description, itemList) => {
//     let total = 0.0
//
//     for (let i = 0; i < itemList.length; i++) {
//       const newQuant = itemList[i].quantity
//       if (newQuant >= 1) {
//         total += itemList[i].price
//       } else {
//         total = itemList[i].price
//       }
//     }
//
//     const transactionObj = {
//       amount: {
//         total: total,
//         currency: 'USD',
//         details: {
//           tax,
//           shipping
//         }
//       },
//       description,
//       item_list: { items: itemList }
//     }
//     return transactionObj
//   }
//
//   paymentService.CreateWithPaypal = (transactionArray, returnUrl, cancelUrl, cb) => {
//     let dbObj = {
//       OrderId: '',
//       CreateTime: '',
//       Transactions: ''
//     }
//
//   }
//
// })
// (
//   module.exports,
//   require('paypal-rest-sdk')
//
// )
