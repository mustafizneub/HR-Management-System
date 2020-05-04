const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const sendgrid = require('sendgrid');
const client = sendgrid('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')

const msg = {
  to: 'mihrabmiah13@gmail.com',
  from: 'admin-example@yotech.ltd',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

exports.sendMail = functions.https.onRequest((req, res) => {
    return Promise.resolve()
        .then(() => {
            if (req.method != 'POST') {
                const error = new Error('Only POST requests');
                error.code = 405;
                throw error;
            }
            
            const request = client.emptyRequest({
                method: 'POST',
                path: '/v3/mail/send',
                body: parseBody(req.body)
            });
            return client.API(request);
        })
    
    
        .then((response) => {
            if (response.body) {
                res.send(response.body)
            } else {
                res.end()
            }
        })
        .catch((err) => {
            console.error(err);
            return Promise.reject(err);
        })
    
        
})