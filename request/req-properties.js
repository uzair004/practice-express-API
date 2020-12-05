const express = require('express');
const app = express();

const greet = express.Router();
9
greet.get('/jp', (req, res) => {
    console.log(`request made to ${req.baseUrl}`);
    res.end();
});

app.use('/greet', greet)

app.listen(3000, () => console.log('listening at port 3000'))