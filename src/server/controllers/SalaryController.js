const firebase = require("firebase/app");
const admin = require('firebase-admin')

var serviceAccount = require("../db-hrmanage-firebase-adminsdk-8k3md-f9dabac146.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://node-testing-33ac9.firebaseio.com"
})
require("firebase/firestore");

let db = admin.firestore();





(
  exports.addSalary = (req, res) => {
    let salary = req.body.salary;
    db.collection('employee-salary').add(salary)
      .then((snapshot) => {
        snapshot.onSnapshot(value => {
          let employee_salary = {
            data: value.data(),
            id: value.id
          }
          db.collection('employee-salary').doc(employee_salary.id).set({
            fStoreId: employee_salary.id
          }, {
            merge: true
          })
        })

        return res.send({
          message: "New Salary Added"
        });
      }).catch(err => {
        return res.send({
          error: {
            message: "Something went wrong",
            status: 400
          }
        })
      });
  },

  exports.addAllowance = (req, res) => {
    let allowance = req.body.allowance;
    db.collection('employee-salary').doc(req.params.id).set(allowance, { merge: true })
      .then(() => {
        return res.send({
          message:'Allowance Added for this month'
        })
          
      }).catch(err => {
            res.send({
              error: {
                message: "Something went wrong",
                code: 400
            }
          })
        })
    
  },

  exports.getAllowance = (req, res) => {
    db.collection('employee-salary')
      .doc(req.params.id).get()
      .then(res => {
      // console.log(res.data())
      //  return res.send(res.data());
        return res.data()
      })
      .then(data => {
        console.log(data)
        res.send(data)
      })
      .catch(err => {
     return res.send({
        error: {
          message: "Something went wrong while fetching data",
          code: 304
        }
      })
    })
  },
  exports.getSalary = (req, res) => {
    res.send('Working')
  }
)
