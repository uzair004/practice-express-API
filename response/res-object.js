const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser('chabi'));

// PROPERTIES on res object


// res.headersSent shows if http headers are sent for response
app.get('/contact', (req, res) => {
    console.dir(res.headersSent);
    res.send('OK');
    console.dir(res.headersSent);
});

// An object that contains response local variables scoped to the request
// This property is useful for exposing request-level information such as the request path name, authenticated user, user settings, and so on.
app.get('/locals', (req, res, next) => {
    console.dir(res.locals);
    next()
});


// METHODS on res object




// set value of http header or create one if doesn't exist
app.get('/append', (req, res) => {
    res.append('Warning', '199 Miscellaneous warning');
    res.end();
})
// Sets the HTTP response Content-Disposition header field to “attachment”, for saving locally instead of displaying in browser
app.get('/attachment', (req, res) => {
    res.attachment('../package.json');
    res.end();
});
// Sets the HTTP response Content-Disposition header field to “attachment”, prompt for download 
app.get('/download', (req, res) => {
    res.download('../package.json', function errCallback(err) {
        if (err) res.send('OOPS cant download');
    });
});

// cookie set named remeberme with value dont forget , expires in 15 mins , path given, not signed cookie
// others options could be  secure?, signed?, httpOnly etc which can be set
app.get('/sendcookie', (req, res) => {
    res.cookie('rememberme', 'dont forget', {maxAge: 900000, path: '/mycookie', signed: true, httpOnly: true})
    res.send('cookie set successfully');
})

// clear cookie that was set
app.get('/clearcookie', (req, res) => {
    res.clearCookie('rememberme', {path: '/mycookie', signed: true, httpOnly: true});
    res.send('cookie cleared successfully');
});


// no response sent, but close request-response cycle
app.get('/end', (req, res) => {
    res.end();
    console.log('request finished! no response sent to client');
});
// returns the HTTP response header specified by field.
app.get('/get', (req, res) => {
    res.get('Content-Type');
});

// sends a JSON response, converts given parameter to json format first.
app.get('/json', (req, res) => {
    res.json({user: 'tobi'});
    res.json(null);
});

// Sets the response Location HTTP header to the specified path parameter.
// Express passes the specified URL to the browser in the Location header, without any validation.
app.get('/location', (req, res) => {
    res.location('www.example.com');
});

// send http response with given parameter as buffer or object, or string or array, auto set content-length and type header according to parameter provided
app.get('/send', (req, res) => {
    // res.send(buffer, object, array, string)
    res.send('hello world');
});

// Sets the response HTTP status code to statusCode and send its string representation as the response body.
app.get('/sendstatus', (req, res) => {
    res.sendStatus(200)
});

app.get('/sendFile', (req, res) => {
    res.sendFile();
});

app.get('/status', (req, res) => {
    res.status(200).send('OK request');
});








app.listen(port, (err) => {
    if (err) console.log("can't create server");
    console.log(`Listening at port ${port}`)
})