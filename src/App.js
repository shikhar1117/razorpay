import './App.css';
import React from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import useRazorpay from 'react-razorpay';
function App() {
  const Razorpay = useRazorpay()
  const [selectedBtn3, setSelectedBtn3] = React.useState(false);
  const [selectedBtn6, setSelectedBtn6] = React.useState(false);
  const [selectedBtn9, setSelectedBtn9] = React.useState(false);
  const [selectedBtn12, setSelectedBtn12] = React.useState(false);
  const [selectedBtn, setSelectedBtn] = React.useState('');
  const [name, setName] = React.useState("Gaurav Kumar")
  const [email, setEmail] = React.useState("gaurav@yopmail.com")
  const [number, setNumber] = React.useState('7317659991');
  const [inputSubscriptionId, setInputSubscriptionId] = React.useState("")

  const onClick3 = () => {
    if (selectedBtn6 === false && selectedBtn9 === false && selectedBtn12 === false) {
      setSelectedBtn3(true);
      setSelectedBtn(3)
    } else {
      setSelectedBtn3(false)
    }
  }
  const onClick6 = () => {
    if ((selectedBtn3 === false && selectedBtn9 === false && selectedBtn12 === false)) {
      setSelectedBtn6(true);
      setSelectedBtn(6)
    } else {
      setSelectedBtn6(false)
    }


  }
  const onClick9 = () => {
    if (selectedBtn3 === false && selectedBtn6 === false && selectedBtn12 === false) {
      setSelectedBtn9(true);
      setSelectedBtn(9)
    } else {
      setSelectedBtn9(false)
    }


  }
  const onClick12 = () => {
    if (selectedBtn3 === false && selectedBtn9 === false && selectedBtn6 === false) {
      setSelectedBtn12(true);
      setSelectedBtn(12)
    } else {
      setSelectedBtn12(false)
    }
  }

  const onPause = () => {
    axios.post('http://localhost:4000/pause-resume', {
      status: "pause",
      subscriptionId: inputSubscriptionId
    }).then(response => {
      alert("Subscription Paused")
      console.log(JSON.stringify(response))
    }).catch(err => console.log(err))
  }

  const onResume = () => {
    axios.post('http://localhost:4000/pause-resume', {
      status: "resume",
      subscriptionId: inputSubscriptionId
    }).then(response => {
      alert("Subscription Resumed")
      console.log(JSON.stringify(response))
    }).catch(err => console.log(err))
  }
  const onSubmit = () => {

    axios.post('http://localhost:4000/createPlan', {
      selectedBtn: selectedBtn,
    }).then((response) => {
      console.log(response.data)
      var options = {
        "key_id": "rzp_test_sjv7IgWV8brRZz",
        "subscription_id": `${response.data.createdSubscription}`,
        "name": "Appventurez Testing Razorpay",
        "description": "Description for the test plan",
        "handler": function (response) {
          alert(response.razorpay_payment_id)
          alert(response.razorpay_subscription_id)
          alert(response.razorpay_signature)
          console.log(response)
        },
        "prefill": {
          "name": name,
          "email": email,
          "contact": number,
          "card[number]": 5267318187975449,
          "card[cvv]": 123,
          "card[expiry]": "12/29"
        }
      };
      var paymentObject = new Razorpay(options);
      paymentObject.open()
    })
      .catch(function (error) {
        console.log(error);
      });

  }
  const settingName = (event) => {
    setName(event.target.value)
  }
  const settingEmail = (event) => {
    setEmail(event.target.value)
  }
  const settingNumber = (event) => {
    setNumber(event.target.value)
  }
  const onChangeSubscription = (event) => {
    setInputSubscriptionId(event.target.value);
  }

  return (
    <div className='mainContainer'>
      <div className='inputDetailsContainer'>
        <div className='inputFieldDiv'>
          <div className='nameAndInputWrapper'>
            <div>NAME: </div>
            <input type="text" placeholder={name} className='inputNameField' onChange={settingName} />
          </div>
          <div className='nameAndInputWrapper'>
            <div>EMAIL: </div>
            <input type="text" placeholder={email} className='inputNameField' onChange={(event) => settingEmail(event)} />
          </div>
          <div className='nameAndInputWrapper'>
            <div>MOBILE: </div>
            <input type="text" placeholder={number} className='inputNameField' onChange={(event) => settingNumber(event)} />
          </div>
        </div>


        <div className='showDetailsDiv'>
          <div className='razorPayText'>RAZORPAY TEST SUBSCRIPTION</div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "79%", height: "170px", justifyContent: "space-between", marginTop: "20px" }}>
            <div style={{ fontSize: "20px" }}>NAME: Appventurez Testing Razorpay </div>
            <div style={{ fontSize: "20px" }}>DESCRIPTION: Testing subscription plan of Razorpay.</div>
            <div style={{ fontSize: "20px" }}>PRICE: Rs 1000/- </div>
          </div>
        </div>
      </div>



      <div className='btnContainer'>
        <Button onClick={onClick3} sx={{ width: "20%", height: "7vh", fontSize: "20px" }} variant={selectedBtn3 ? "outlined" : "contained"}>3 Months</Button>
        <Button onClick={onClick6} sx={{ width: "20%", height: "7vh", fontSize: "20px" }} variant={selectedBtn6 ? "outlined" : "contained"}>6 Months</Button>
        <Button onClick={onClick9} sx={{ width: "20%", height: "7vh", fontSize: "20px" }} variant={selectedBtn9 ? "outlined" : "contained"}>9 Months</Button>
        <Button onClick={onClick12} sx={{ width: "20%", height: "7vh", fontSize: "20px" }} variant={selectedBtn12 ? "outlined" : "contained"}>12 Months</Button>
      </div>



      <Button onClick={onSubmit} sx={{ width: "10%", height: "7vh", fontSize: "20px", marginTop: "30px" }} variant="contained">SUBMIT</Button>

      <div className='btnContainer1'>
        <input onChange={(event) => onChangeSubscription(event)} type={"text"} placeholder="Enter Subscription Id" style={{ width: "40%", fontSize: "25px", paddingLeft: "10px" }} />
        <Button onClick={onPause} sx={{ width: "20%", height: "7vh", fontSize: "20px" }} variant={selectedBtn3 ? "outlined" : "contained"}>Pause</Button>
        <Button onClick={onResume} sx={{ width: "20%", height: "7vh", fontSize: "20px" }} variant={selectedBtn12 ? "outlined" : "contained"}>Resume</Button>
      </div>
    </div >
  )

}

export default App;
