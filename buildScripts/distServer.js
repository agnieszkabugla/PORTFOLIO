import express from 'express';
import path from 'path';
import compression from 'compression'; 

/* eslint-disable no-console */

const port = 8080;
const app = express();

app.use(compression()); 
app.use(express.static(path.join(__dirname, '../dist')));


app.get('*', function(req, res) {
   res.sendFile(path.join( __dirname, '../dist/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Your app is running on localhost:${port}`);
  }
});