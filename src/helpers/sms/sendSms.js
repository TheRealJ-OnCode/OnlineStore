const accountSid =process.env.accountSid; 
const authToken =process.env.authToken; 
require("dotenv").config();
const client = require('twilio')(accountSid, authToken);
const sendSMS  = (phoneNumber) =>{
    //phone number is required , 
    client.verify.v2.services(process.env.verifyService)
      .verifications
      .create({to: '+994702390031', channel: 'sms'})
      .then(verification => console.log(verification.sid));
}
