const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');


// req.baseUrl shows base url at which router was mounted
// req.path shows path after base url
// req.orignalUrl = req.baseUrl + req.path
const greet = express.Router();
greet.get('/salam', (req, res) => {
    console.log(`baseUrl is ${req.baseUrl}
    path is ${req.path}
    orignalUrl is ${req.originalUrl}`);
    res.end();
});
app.use('/greet', greet);

// req.route contain currently matched route details
app.get('/user', function userHandler(req, res) {
    res.send(req.route)
})

// req.body, contain key-value pairs data of request, need to go through body-parser middleware otherwise will be undefined
app.get('/body', (req, res, next) => {
    console.log(req.body);
    next()
});

//after request go through body-parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/body', (req, res) => {
    console.log(req.body)
    res.end();
});



// req.cookies, req.signedCookies , {} untill parsed by cookie-parser 

// sent cookie to client and checked before parsing
app.get('/cookieunparsed', (req, res) => {
    res.cookie('name', 'uzair');
    console.log(req.cookies);
    res.send('cookie sent as '+req.cookies);
});

//after parsing
app.use(cookieParser('THE SECRET'));

app.get('/cookieparsed', (req, res) => {
    res.cookie('name', 'khan');
    console.log(req.cookies);
    res.send('cookie sent as '+req.cookies.name);
});
// cookie that expires
app.get('/cookieexpire', (req, res) => {
    res.cookie('expirable', 'this will expire after given time', {maxAge: 360000});
    console.log(req.cookies);
    res.send('expirable cookie sent as '+req.cookies);
});
//clear existing cookie
app.get('/clearcookie', (req, res) => {
    res.cookie('mycookie', 'valueofcookie');
    res.send(`clearing cookie called ${req.cookies.mycookie}`)
    res.clearCookie('mycookie');
})

app.get('/signedcookies', (req, res) => {
    res.cookie('signedcookie', 'this is signed cookie according to secret', {signed: true});
    res.send(`signed cookie added as ${req.signedCookies.signedcookie} in signedCookies object`)
});


// get these details from HTTP header , from x-forwarded- if trust proxy is not false

// get hostname,ip,method of request from HTTP header , trust proxy if not enabled 
app.get('/gethostname&ip&method&protocol', (req, res) => {
    res.send(`hostname is ${req.hostname} and ip is ${req.ip} method used is ${req.method} and protocol used is ${req.protocol}`)
});

// multiple ips from proxy, if any
app.get('/getmultipleips', (req, res) => {
    res.send(`request ips are ${req.ips}`)
});


// app.params object contain route paramters 
app.get('/user/:id', (req, res) => {
    res.send(`parameter ${req.params.id} sent as value for id`)
});

// app.query is object containing contain query string in route
app.get('/search', (req, res) => {
    res.send(`query is ${req.query.name} ${req.query.role}`)
});


// req.xhr is true if request X-Requested-With header set to 'XMLHttpRequest' shows that request was made from client library llke jQuery
app.get('/isxhr', (req, res) => {
    res.send(`is it xhr request ? ${req.xhr ? 'YES' : 'NO'}`)
});



//  METHODS on req object

// req.get(field) to get specified http header field
app.get('/check', (req, res) => {
    res.send(`HTTP header Content-type is ${req.get('Content-Type')}`);
});

// Returns the matching content type if the incoming request’s “Content-Type” HTTP header field matches the MIME type specified by the type parameter. If the request has no body, returns null. Returns false otherwise.
app.get('/checkcheck', (req, res) => {
    console.log(req.is('html'))
    res.send('done')
})

app.listen(3000, () => console.log('listening at port 3000'))