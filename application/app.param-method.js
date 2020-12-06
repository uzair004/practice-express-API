const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.param(['id', 'pics'], (req, res, next, parameters) => {
    console.log(`${parameters} caught by app.param`)
    next()
})

app.get('/user/:id/:pics', (req, res) => {
    console.log(`app.get for ${req.params.id} & ${req.params.pics}`)
    res.end();
})

app.listen(port, () => console.log(`listening at ${port}`));