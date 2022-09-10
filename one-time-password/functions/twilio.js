const twilio = require("twilio");

const accountSid = "AC7a819074ab6868357bdeccae3963c580";
const authToken = "0ce5e01ec102868910dd1c7b332b4aea";

module.exports = new twilio.Twilio(accountSid, authToken);
