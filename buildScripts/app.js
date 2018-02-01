import express from 'express'; 
import path from 'path'; 
import webpack from 'webpack';
import config from '../webpack.config.dev'; 

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

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname, '../public/index.html'))
//     // __dirname -> The directory name of the current module.
// })

// /public/styles/css/styles.css

app.listen(port, function (err) {
    if(err) {
        console.log(err); 
    } else {
        console.log('server is running, PORT ' + port);
    }   
});