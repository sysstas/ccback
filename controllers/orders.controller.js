var express = require('express')
var router = express.Router()
var Master = require('../models/Master')
var Order = require('../models/Order')

var mysql = require('mysql');
var db_config = {
	host     : 'ccdb.cyvbhrm19emn.eu-west-1.rds.amazonaws.com',
	port : '3306',
	user     : 'ccadmin',
	password : 'chdelsss',
	database: 'ccdb'
  };

  var connection;

  function handleDisconnect() {
    connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                    // the old one cannot be reused.
  
    connection.connect(function(err) {              // The server is either down
      if(err) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
      }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        handleDisconnect();                         // lost due to either server restart, or a
      } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
      }
    });
  }
  
  handleDisconnect();


//sendgrid config
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

router.get('/', getAllOrders)
router.post('/', makeOrder);
router.put('/:id', editOrder);
router.delete('/:id', deleteOrder);

module.exports = router;

/// Functions
// POST

// async function makeOrder(req, res) {  
//   let { id, date, time, userName, userEmail } = req.body 
//   console.log(id)
//   let orderDetail = {
//     date: date,
//     time: time[0],
//     duration: time.length,
//     masterName: req.body.masterName,
//     masterId: id,
//     clientEmail: userEmail,
//     clientName: userName,
//     city: req.body.city
//   } 
  /////////// Saving new order in orders collection

  // let orderId = null
  // let createNewOrder = new Order(orderDetail)
  // createNewOrder.save((err, result) => {
	// 	if(err){
	// 		console.log(err)
	// 		return res.status(500).send(err);      
	// 	}
  //   orderId = result._id
  //   console.log(orderId)
  // }) 
   
  // Create busy object

  // let busyObj = {
  //   date: date,
  //   time: time
  // } 

  ////////// Saving changes to master's schedule

  // Master.findById(id, (err, mast) => { 

    /// if there is no data in busy array, we need to assign there busyObj

    // if (mast.busy.length == 0) {
    //   mast.busy = busyObj
    //   mast.save((err, result) => {
    //     if(err)
    //       console.log('saving data error')
    //     res.sendStatus(200)
    //   })

    ///  if busy array contain some data

    // } else{
    //   var workingToday = false
    //   mast.busy.forEach((element, index, array)=> {

        /// checking if master works tooday we need to merge busy.time and time arrays for avoiding date duplicatig
        
        // if (array[index].date == date) {      
        //   workingToday = true
        //   mast.busy[index].time  = mast.busy[index].time.concat(time)

          /// will not work if we not mark changes here

      //     mast.markModified("busy")          
      //     mast.save((err, result) => {
      //       if(err)
      //         console.log('saving data error')
      //         res.sendStatus(200)
      //     })        
      //   }   
      // })

      /// if master works on some other day we just push busyObj to busy array

  //     if(!workingToday){
  //       mast.busy.push(busyObj)
  //       mast.save((err, result) => {
  //         if(err)
  //           console.log('saving data error')
  //         res.sendStatus(200)
  //       })
  //     }
  //   }
  // })

  // sending email to user 

  // let masterName = req.body.masterName;
  // let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  // let dateMsg = new Date(req.body.dateMsg).toLocaleDateString("en-US",options)
  // let startTime = busyObj.time[0];
  // let duration = busyObj.time.length;
  


  // var msg = {
  //   to: userEmail,
  //   from: 'noreply@cc.com',
  //   subject: 'Clockwise Clockwork master order',
  //   text: ' ',
  //   html: '<h3>Hello, '+userName+'.</h3><p><strong> Thank you for order.</p><p> Master '+masterName+' will come to you at '+ startTime+':00 '+dateMsg+' and will repear your clock in about '+duration+' hours.</p><p> Visit our <a href="http://ec2-34-244-145-145.eu-west-1.compute.amazonaws.com/">site</a> again if you have another clock to repear</strong></p>'
  // }
  // console.log(msg)

  // sgMail.send(msg)

// }

// GET

/// Get all orders
async function getAllOrders(req, res){
  let sql = `
  SELECT 
    orders.ID,
    orders.cityID,
    cities.cityName,
    orders.masterID,
    masters.masterName,
    orders.clientID,
    clients.clientName,
    clients.clientEmail,
    orders.date,
    orders.time,
    orders.duration
  FROM orders
  LEFT JOIN cities 
    ON orders.cityID = cities.ID
  LEFT JOIN masters
    ON orders.masterID = masters.ID
  LEFT JOIN clients
    ON orders.clientID = clients.ID
`
  try {
    await connection.query(sql, function(er, response){
      if (!er) 
      console.log(response)
      res.status(200).send(response)        
    });	  	
	} catch (error) {
		console.log(error)    
		res.sendStatus(500)
	}    
}

/// Create Order
async function makeOrder(req, res){
  console.log('request: ', req.body)
  let sql = `
  INSERT INTO orders (
    cityID, 
    masterID,
    clientID,
    date,
    time,
    duration
  ) 
  VALUES(
    ${req.body.cityID},
    ${req.body.masterID},
    ${req.body.clientID},
    ${req.body.date},
    ${req.body.time},
    ${req.body.duration}
  )
  `
  console.log(sql)
  try {
    await connection.query(sql, function(er, result){
      if (!er) 
      console.log(result)
      res.status(201).send(result)
    });    
	} catch (error) {
		console.log(error)    
		res.sendStatus(500)
	}    
}

async function editOrder(req, res){
  console.log(req.body) 
  let sql =`
  UPDATE orders 
    SET 
      cityID = ${req.body.cityID}, 
      masterID = ${req.body.masterID},
      clientID = ${req.body.clientID},
      date = ${req.body.date},
      time = ${req.body.time},
      duration = ${req.body.duration}        
  WHERE ID = ${req.params.id}
  ` 
  console.log(sql)
  try {
    await connection.query(sql, function(er, result){
      if (!er) 
      console.log(result)
      res.status(201).send(result)
    });     
	} catch (error) {
		console.log(error)    
		res.sendStatus(500)
	}    
}

async function deleteOrder(req, res){
  let sql = "DELETE FROM orders WHERE ID = '"+req.params.id+"'" 
  console.log(sql)
  try {
    await connection.query(sql, function(er, result){
      if (!er) 
      console.log(result)
      res.status(201).send(result)
    });     
	} catch (error) {
		console.log(error)    
		res.sendStatus(500)
	}    
}




// async function getAllOrders(req, res){
//   try {
// 		var orders = await Order.find({}, '-__v') 
// 		res.status(200).send(orders)
// 	} catch (error) {
// 		console.log(error)    
// 		res.sendStatus(500)
// 	}    
// }

// DELETE

// async function deleteOrder(req, res){
//   try {

    //retrieve order data for cleen master's schedule

    // let  date, timeStart, duration, masterId
    // let timeArr = []
    // for (let i = 0; i < duration; i++) {
    //   timeArr.push() = timeStart+i    
    // }
    // await Order.findById(req.params.id, (err, result)=>{
    //   try {

      //console.log(result)

      // date = result.date
      // timeStart = result.time
      // duration = result.duration
      // masterId = result.masterId

      /// cleaning master shedule

      // Master.findById(masterId, (err, mast) => { 
      //   try {
      //     console.log(mast)
      //     mast.busy.forEach((element, index, array)=> {            
      //       if (-array[index].date === -date) {
      //         console.log("here they come")
      //         for (let x = 0; x < duration; x++) {
      //           let certainTime = timeStart + x
      //           console.log(certainTime)

                //console.log(array[index].time)

            //     let i = array[index].time.indexOf(certainTime);
            //     if (i > -1) {
            //       array[index].time.splice(i, 1);
            //     }                
            //   } 
            // }
            // mast.markModified("busy")          
            // mast.save((err, result) => {
            // if(err)
            //   console.log('saving data error')
            //   console.log(err)

              //res.sendStatus(200)

    //         })
    //       })
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   })

    //   } catch (error) {
    //   console.log(error)
    //   res.sendStatus(500)
    //   }
    // })

    // deleteting order

//     await Order.findByIdAndRemove(req.params.id, (err, result)=>{
//       try {
//         console.log("Order deleted")
//         return res.status(204).send(result)
//       } catch (error) {
//         console.log(error)
//         res.sendStatus(500)
//       }
//     });
//   } catch (error) {
//     console.log(error)
//     res.sendStatus(500)
//   }
// }