const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

// app.use() Mounts/register the specified middleware function or functions at the specified path: 
// the middleware function is executed when the base of the requested path matches path.

// server static files from multiple directories, checked one by one for resource
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'files')))
app.use(express.static(path.join(__dirname, 'uploads')))


// custom defined middleware for every request to app
app.use(function (req, res, next) {
    console.log('Time: %d', Date.now())
    next()
  })

//prebuilt middleware mounts for every request made to app
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// router used as middleware for request to /users/ or anything following e.g users/dkd users/me etc
const userRouter = express.Router();
app.use('/users', userRouter)

// middleware for logging HTTP request e.g
// app.use(morgan('dev'))

//error handling middleware
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })



app.listen(port, (err) => {
    if(err) throw new Error('cannot create server');
    console.log(`listening at port ${port}`)
})