import axios from 'axios';

// Alpha sms https://www.sms.net.bd/api 

const phoneOtpSend = async (phone: string, message: string) => {

  const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.sms.net.bd/sendsms',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : JSON.stringify({
            "api_key": "YOUR_API_KEY",
            "msg": message,
            "to": phone
          })
      };
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
}

export default phoneOtpSend