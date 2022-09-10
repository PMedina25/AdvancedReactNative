const admin = require("firebase-admin");
const twilio = require("./twilio");

module.exports = (req, res) => {
  if (!req.body.phone)
    return res.status(422).send({ error: "You must provide a phone number" });

  const phone = String(req.body.phone).replace(/[^\d]/g, "");

  // admin
  //   .auth()
  //   .getUser(phone)
  //   .then(() => {
  //     const code = Math.floor(Math.random() * 8999 + 1000);

  //     twilio.messages.create(
  //       {
  //         body: "Your code is " + code,
  //         from: "+19853364096",
  //         to: phone,
  //       },
  //       (err) => {
  //         if (err) return res.status(422).send(err);

  //         admin
  //           .database()
  //           .ref("users/" + phone)
  //           .update({ code, codeValid: true }, () => {
  //             res.send({ success: true });
  //           });
  //       }
  //     );
  //   })
  //   .catch((error) => res.status(422).send({ error }));
};
