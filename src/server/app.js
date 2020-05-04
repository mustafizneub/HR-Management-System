const express = require("express");
const app = express();

const logger = require("morgan");
const nodemailer = require('nodemailer');

const pdfMake = require('../../bower_components/pdfmake/build/pdfmake.js');
const pdfFonts = require('../../bower_components/pdfmake/build/vfs_fonts')

const cors = require('cors')

const salaryRoute = require('./routes/salary-routes');
require('./configs/firebase-config');

app.use(logger("dev"));

app.use(cors('*'))


pdfMake.vfs = pdfFonts.pdfMake.vfs;


app.use(express.json());

app.get('/sendmail', (req, res) => {
  res.send({
    message: "Server Running"
  })
})
app.post('/sendmail', async (req, res) => {
  console.log('Sending email....');

  let example = req.body.pdf;

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'lesley.senger@ethereal.email',
      pass: '91HZGRGf25JxWQEgD4'
    }
  });


  let info = await transporter.sendMail({
    from: 'admin@yotech.ltd',
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.subject,
    html: req.body.message,
    attachments: [{
      filename: 'example.pdf',
      content: Buffer.from(example, 'utf-8')
    }]
  });

  return (res.send({
    'succeess': true
  }))
});



app.use('/', salaryRoute);

module.exports = app;
