const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// using app.set to change settings of app

app.set('case sensitive routing', true);

app.set('strict routing', true);

app.set('json escape', true); //escape some characters in json while sending thorugh res.send or res.json to avoid XSS attack

app.set('query parser', 'simple') // simple, extended or false to turn off or change type of parser

console.log(app.get('env'))
app.set('env', 'production')
console.log(app.get('env'))

app.set('trust proxy', true); // better way to get client IP, which can be spoofed by client

app.set('views', 'views'); // set view directory
app.set('view cache', true); // view cache, on in production by default
app.set('view engine', 'hbs'); //view engine to use, default taken from view extension

app.set('x-powered-by', false); //disable x-powered-by:Express http header


app.get('/', (req, res) => {
    console.log('get request recieved');
    res.end();
});

app.post('/', (req, res) => {
    console.log('post request recieved');
    res.end();
});

app.get('/events', (req, res) => {
    console.log('another get request..');
    res.end();
});



app.listen(port, (err) => {
    if(err) throw new Error('cannot create server');
    console.log(`listening at port ${port}`)
})