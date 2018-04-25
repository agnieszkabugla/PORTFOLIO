import express from 'express';
import path from 'path';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import fs from 'fs';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';

/* eslint-disable no-console */


const port = 8080;
const app = express();

//WEBPACK CONFIG
const compiler = webpack(config);
app.use(require('webpack-dev-middleware') (compiler, {
    noInfo: true,
    publickPath: config.output.publicPath
}));


app.use(express.static(path.join(__dirname, '../source')));


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
  //console.log(`login used to send email: ${process.env.USER}`);
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.USER,// generated ethereal user
      pass: process.env.PASSWORD// generated ethereal password
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: process.env.FROMEMAIL, // sender address
    to: process.env.MAINEMAIL, // list of receivers
    subject: 'A new mail from PORTFOLIO page', // Subject line
    text: `You have got one new message from: \n
      ${formData.name} \n
      ${formData.email} \n
      MESSAGE:  \n
      ${formData.message}`
  };

  // setup email data to the nw userwith unicode symbols
  let mailOptions2 = {
    from: process.env.FROMEMAIL, // sender address
    to: formData.email, // list of receivers
    subject: 'Thank you for your message', // Subject line
    text: ' Thanks! ',
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }

    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });

  transporter.sendMail(mailOptions2, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
}

app.use(bodyParser.json());

app.post('/sendMail', (req, res) => {
  console.log(req.body);
  sendMail(req.body);
  saveEmail(req.body);
  res.send({ success: "true" });
});



app.listen(port, function (err) {
  if(err) {
    console.log(err);
  } else {
    console.log('server is running, PORT ' + port);
  }
});
