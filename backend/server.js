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

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.post('/verify', async (req, res) => {
try{

  const data = validateWebhookSignature(JSON.stringify(req.body), req.headers["x-razorpay-signature"], "secret")
  console.log(data)
  console.log(JSON.stringify(req.body))
}catch(err){
  console.log(err)
}
})

app.post('/createPlan', async (req, res) => {
  try {


    const plan = {
      "period": "weekly",                                           //daily,weekly,monthly,yearly
      "interval": 1,                                                //integer This, combined with period, defines the frequency. If the billing cycle is 2 months, the value should be 2.
      "item": {
        "name": "Appventurez Testing Razorpay",
        "amount": 1000 * 100,
        "currency": "INR",
        "description": "Description for the test plan"
      }
    }
    const createdPlan = await instance.plans.create(plan)

    const subscription = {
      "plan_id": createdPlan.id,
      "total_count": req.body.selectedBtn,                      //The number of billing cycles for which the customer should be charged
      "customer_notify": 1,                                    //Indicates whether the communication to the customer would be handled by you or us
      "start_at": (Math.floor((new Date().getTime() - new Date().getTimezoneOffset() * 60000) / 1000) + 24 * 60 * 60).toString(),
      "addons": [
        {
            "item": {
                "name": "Subscription start charges",
                "amount": 1 *100,
                "currency": "INR"
            }
        }
    ]
    }

    const createdSubscription = await instance.subscriptions.create(subscription)
    res.json({ "createdSubscription": createdSubscription.id })
  } catch (error) {
    console.log(error)
  }

})

app.post('/fetchSubscription', async (req, res) => {
  try{

    const value = await instance.subscriptions.fetch(req.body.subscriptionId)
    res.send(value)
  }catch (err){
    console.log(err)
  }
}) 

app.post('/pause-resume', async (req, res) => {
  try{

    if(req.body.status == "pause"){
      const value = await instance.subscriptions.pause(req.body.subscriptionId)
      res.send(value)
      
    }else if(req.body.status == "resume"){
      const value = await instance.subscriptions.resume(req.body.subscriptionId)
      res.send(value)
    }
  }catch(err){
    console.log(err)
  }
})



app.listen(4000, () => console.log(`Server is running on port 4000`))