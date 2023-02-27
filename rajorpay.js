// const Razorpay = require('razorpay');

// //Creating instance of razorpay account.
// const instance = new Razorpay({
//     key_id: "key_id",
//     key_secret: "secret_key",
// });

// const plan ={   
//     "period": "monthly",                                //daily,weekly,monthly,yearly
//     "interval": 1,                                      //integer This, combined with period, defines the frequency. If the billing cycle is 2 months, the value should be 2.
//     "item": {     
//        "name": "Test",     
//        "amount": "amount" * 100,      
//        "currency": "INR",     
//        "description": "Description for the test plan"   
//     },   
//     "notes": {     
//        "notes_key_1": "notes1",     
//        "notes_key_2": "notes2"   
//     } 
// }
// instance.plans.create(plan).then((result) => console.log(result))



// const subscription = {
//         "plan_id":"plan_id",                  
//         "total_count":6,                      //The number of billing cycles for which the customer should be charged
//         "customer_notify":1,                  //Indicates whether the communication to the customer would be handled by you or us
//         "addons":[
//           {
//             "item":{
//               "name":"Test",
//               "amount":10000,
//               "currency":"INR"
//             }
//           }
//         ]
//       }
    
//       instance.subscriptions.create(subscription).then((result) => console.log(result))



// const subscription_detail =   instance.subscriptions.fetch("subscriptionId")



// function handleSubscription(){
//     const Razorpay = useRazorpay();
//     var options = { 
//        "key_id": "key_id",
//        "subscription_id": "subscription_id", 
//        "name": "name", 
//        "description": "description",  
//        "handler": function(response) { 
//           console.log(response.razorpay_payment_id,response.razorpay_subscription_id,response.razorpay_signature) 
//        }, 
//        "prefill": { 
//           "name": "Gaurav Kumar", 
//           "email": "mailto:gaurav.kumar@example.com", 
//           "contact": "+919876543210" 
//        }
//     }; 
//     var paymentObject = new Razorpay(options);
//     paymentObject.open()
//  }


