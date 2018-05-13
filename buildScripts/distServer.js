import express from 'express';
import path from 'path';
//import compression from 'compression';
import fs from 'fs';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import bodyParser from 'body-parser';

/* eslint-disable no-console */

const port = 8080;
const app = express();

//app.use(compression());
app.use(express.static(path.join(__dirname, '../dist')));


//function saving a newly signed email to the file emails.csv
function saveEmail(dataToWrite) {
  fs.appendFile('emails.csv', `${dataToWrite.email},${dataToWrite.name},${dataToWrite.message}\n`, (err) => {
    if (err) {
      console.log('Some error occured - file either not saved or corrupted file saved.');
    } else {
      console.log('The new email has been successfully appended to emails.csv!');
    }
  });
}

function sendMail(formData) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: process.env.HOST,
    //port: 465,
    //secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.USER,// generated ethereal user
      pass: process.env.PASSWORD// generated ethereal password
    }
  }));

  // setup email data with unicode symbols
  let mailOptions = {
    from: formData.name, // sender address
    to: process.env.TOMAIL, // list of receivers
    subject: 'A new mail from PORTFOLIO page', // Subject line
    text: `You have got one new message from: \n
      ${formData.name} \n
      ${formData.email} \n
      MESSAGE:  \n
      ${formData.message}`
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
}

app.use(bodyParser.json());

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../dist/index.html'));
});

app.post('/sendMail', (req, res) => {
  console.log(req.body);
  sendMail(req.body);
  saveEmail(req.body);
  res.send({ success: "true" });
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Your app is running on localhost:${port}`);
  }
});
