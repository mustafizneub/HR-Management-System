const moment = require("moment");
const admin = require("firebase-admin");
const CronJob = require("cron").CronJob;

require("firebase/firestore");

let db = admin.firestore();

function addMonthlyAllowance() {
  let month = moment()
    .subtract(1, "month")
    .format("MMM-YYYY")
    .split("-")
    .join("_");

  let ndate = moment().format("MM-DD-YYYY").split("-");
  let m = (parseInt(ndate[1]) + 29).toString();
  ndate[1] = m;
  let issue_date = ndate.join("-");

  let Months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "Jun",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  db.collection("employee-salary")
    .get()
    .then((res) => {
      let salaries = [];
      res.docs.forEach((emps) => {
        salaries.push(emps.data());
      });

      salaries.forEach((data) => {
        if (!data[month]) {
          data[month] = {
            monthly_amount: data.staff_salary,
            type: "Monthly Amount",
            total_amount: "BDT- " + data.staff_salary,
            salary_id: Date.now().toString(),
            date: issue_date,
            issue_date: issue_date,
            month: Months[new Date().getMonth() - 1],
          };
          db.collection("employee-salary").doc(data.fStoreId).update(data);
        }

      });
      console.log("Adding")
    });
}

// CRON JOB
// SEC MIN HOUR DAY MONTH WEEK-DAY
let job = new CronJob("00 45 15 11 0-11 *", () => {
  addMonthlyAllowance();
});

job.start();

// CRON JOB ENDS

// function formatAMPM(date) {
//   var hours = date.getHours();
//   var minutes = date.getMinutes();
//   var ampm = hours >= 12 ? "pm" : "am";
//   hours = hours % 12;
//   hours = hours ? hours : 12; // the hour '0' should be '12'
//   minutes = minutes < 10 ? "0" + minutes : minutes;
//   var strTime = hours + ":" + minutes + " " + ampm;
//   return strTime;
// }
// let month = new Date().getMonth();

// setTimeout(function run() {
//   let date = new Date();

//   var dd = String(date.getDate()).padStart(2, "0");

//   let day = dd;

//   let time = formatAMPM(date);

//   if (time === "4:44 pm" && day === "10" && month === new Date().getMonth()) {
//     month = month <= 10 ? month + 1 : 0;
//     addMonthlyAllowance();
//   }

//   setTimeout(run, 1000);
// }, 1000);
