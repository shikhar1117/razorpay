const express = require("express");
const app = express();
const cors = require("cors");
const Razorpay = require('razorpay');
const { validateWebhookSignature } = require("../node_modules/razorpay/dist/utils/razorpay-utils")
require('dotenv').config();
const instance = new Razorpay({
  key_id: process.env.Key_id,
  key_secret: process.env.Secret_key,
});
const tls = require('tls')
const https = require('live-server-https');
 
const server = tls.createServer(https, (socket) => {
  console.log('server connected',
              socket.authorized ? 'authorized' : 'unauthorized');
  socket.write('welcome!\n');
  socket.setEncoding('utf8');
  socket.pipe(socket);
});
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// sub_LJTPRvjKWbE1vS

// app.post('/verify', async (req, res) => {
//   console.log(JSON.stringify(req.body))
//   const data = validateWebhookSignature(JSON.stringify(req.body), req.headers['x-razorpay-signature'], "secret")
//   console.log(data)
// })

app.post('/verify', (req, res) => {
  console.log(req)
  // const challenge = req.query['hub.challenge'];
  // const verify_token = req.query['hub.verify_token'];
  

    return res.status(200).send(challenge);  // Just the challenge


})

app.post('/createPlan', async (req, res) => {
  try {


    const plan = {
      "period": "monthly",                                           //daily,weekly,monthly,yearly
      "interval": 1,                                                //integer This, combined with period, defines the frequency. If the billing cycle is 2 months, the value should be 2.
      "item": {
        "name": "Appventurez Testing Razorpay",
        "amount": 10 * 100,
        "currency": "INR",
        "description": "Description for the test plan"
      }
    }
    const createdPlan = await create.plans.create(plan)
            
    const subscription = {      
      "plan_id": createdPlan.id,
      "total_count": req.body.selectedBtn,                      //The number of billing cycles for which the customer should be charged
      "customer_notify": 1,                                    //Indicates                                                                                                                                                                                                                                                                                                                                b whether the communication to the customer would be handled by you or us
      "start_at": (Math.floor((new Date().getTime() - new Date().getTimezoneOffset() * 60000) / 1000) + 300).toString()
    }

    const createdSubscription = await instance.subscriptions.create(subscription)

    res.json({ createdSubscription: createdSubscription.id })
  } catch (error) {
    console.log(error)
  }

})

app.post('/fetchSubscription', async (req, res) => {
  console.log(req.body)
  const value = await instance.subscriptions.fetch(req.body.subscriptionId)
  // console.log(value)
  res.send(value)
})

// const instance = new Razorpay({
//   key_id: process.env.Key_id,
//   key_secret: process.env.Secret_key,
// });

// instance.subscriptions.createAddon('sub_LJTPRvjKWbE1vS', {
//   item: {
//     name: "testing addon",
//     amount: 100 * 100,
//     currency: "INR",
//   },
//   quantity: 1
// }).then(result => {
//   console.log("created add on --------", result)
//   instance.subscriptions.fetch("sub_LJTPRvjKWbE1vS").then(result => console.log(JSON.stringify(result))).catch(error => console.log(error))
// })

server.listen(4000, () => console.log(`Server is running on port 4000`))