const admin = require("firebase-admin");
const functions = require("firebase-functions");
const createUser = require("./create_user");
const requestOneTimePassword = require("./request_one_time_password");
const verifyOneTimePassword = require("./verify_one_time_password");
const serviceAccount = require("./service_account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://one-time-authentication-65438-default-rtdb.europe-west1.firebasedatabase.app/",
});

exports.createUser = functions.https.onRequest(createUser);
exports.requestOneTimePassword = functions.https.onRequest(
  requestOneTimePassword
);
exports.verifyOneTimePassword = functions.https.onRequest(
  verifyOneTimePassword
);
