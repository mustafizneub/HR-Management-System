// const express = require('express');
// const PORT = process.env.PORT || 3000;
// const cors = require('cors');
// const nodemailer = require('nodemailer');
// const app = express();
// const pdfMake = require('../../bower_components/pdfmake/build/pdfmake.js');
// const pdfFonts = require('../../bower_components/pdfmake/build/vfs_fonts')

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// app.use(cors({
//   origin: '*'
// }))
// app.use(express.json());

// app.get('/sendmail', (req, res) => {
//   res.send({
//     message: "Server Running"
//   })
// })
// app.post('/sendmail', async (req, res) => {
//   console.log('Sending email....');

//   let example = req.body.pdf;

//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: 'lesley.senger@ethereal.email',
//       pass: '91HZGRGf25JxWQEgD4'
//     }
//   });


//   let info = await transporter.sendMail({
//     from: 'admin@yotech.ltd',
//     to: req.body.email,
//     subject: req.body.subject,
//     text: req.body.subject,
//     html: req.body.message,
//     attachments: [{
//       filename: 'example.pdf',
//       content: Buffer.from(example, 'utf-8')
//     }]
//   });

//   return (res.send({
//     'succeess': true
//   }))
// });

const app = require('./app.js')
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`server running at port ${PORT}`))
