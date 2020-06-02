const firebase = require("firebase");
const admin = require('firebase-admin')

var serviceAccount = require("../db-hrmanage-firebase-adminsdk-8k3md-f9dabac146.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://node-testing-33ac9.firebaseio.com"
});

var firebaseConfig = {
  apiKey: "AIzaSyAN6oghZCvNQWKd-ulLdXLN4rRLg8KjVr4",
  authDomain: "db-hrmanage.firebaseapp.com",
  databaseURL: "https://db-hrmanage.firebaseio.com",
  projectId: "db-hrmanage",
  storageBucket: "db-hrmanage.appspot.com",
  messagingSenderId: "774366621877",
  appId: "1:774366621877:web:58543c699c7ed48516cefc",
  measurementId: "G-4LVTQTB6BK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
