const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.route('/events')
    .all(function(req, res, next) {
        console.log('app.all fired');
        next();
    })
    .get(function(req, res, next) {
        console.log('get request served');
        res.json('here is list of events');
    })
    .post(function(req, res, next) {
        console.log('post request served');
        res.end();
    })


app.listen(port, (err) => {
    if(err) throw new Error('cannot create server');
    console.log(`listening at port ${port}`)
})