import twilio from "twilio";

const accountSid = process.env.REACT_APP_TWILIO_ACCOUNT_SID
const authToken = process.env.REACT_APP_TWILIO_AUTH_TOKEN

export const twimClient = twilio(accountSid, authToken)