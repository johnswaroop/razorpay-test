import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useState } from 'react';

const Razorpay = window.Razorpay;

function App() {

  var options = {
    "key": "rzp_test_VnSs033Scyq7MW", // Enter the Key ID generated from the Dashboard
    "amount": "0", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "ads4publish.com",
    "description": "Test Transaction",
    "order_id": "order_DBJOWzybf0sJbb", //This is a sample Order ID. Pass the `id` obtained in the previous step
    "handler": function (response) {
      alert("Payment intiated success")
      console.log(response);
      setStatus(["Payment initiation success", response]);
    },
    "notes": {
      "address": "https://ads4publish.com/"
    },
    "theme": {
      "color": "#3399cc"
    },
  };

  

  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState(["",{}]);

  const paymentRequest = async () => {
    if (amount <= 0) return
    try {
      options.amount = amount;
      let res = await axios.post('/payment', {
        amount
      });
      if (res.data.status === 'success') {
        options.order_id = res.data.order.id;
        var rzp1 = new Razorpay(options);
        rzp1.on('payment.failed', function (response) {
          alert("Payment intiation failed")
          console.log(response);
          setStatus(["Payment intiation failed", response]);
        });

        rzp1.open();

      }
      else {
        alert(res.data.error);
        console.log(res)
      }

    }
    catch (er) {
      console.log(er);
    }

  }


  return (
    <div className="App">
      <h1>Test payment</h1>
      <div className='payment'>
        <input value={amount} onChange={(e) => { setAmount(e.target.value) }} />
        <button onClick={paymentRequest}>Pay now </button>
        <div style={{ marginTop: "5rem" }}>
          <h2>Status {status[0]}</h2>
          <pre>
            <code>
              {
                Object.keys(status[1]).map((val) => {
                  return (
                    <p>{val} : {status[1][val]}</p>
                  )
                })
              }
            </code>
          </pre>

        </div>
      </div>
    </div>
  );
}

export default App;
