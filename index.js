require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { queryUserNotes } = require('./queries/queryUserNotes');
const { authenticateUser } = require('./queries/Authentication');
const app = express();




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.send({ title: "User Notes API Entry Point" });
})

app.get('/usernotes', async function (req, res) {
    let user = await authenticateUser(req).then(queryUserNotes)
    .then(notes => {
           return res.status(200).json(notes);
     })
    .catch((err) => {
        let e = err.split('-');
       return res.status(e[0]).json(e[1]);
    });

    if (user === undefined) { return res.status(500).json("Ocurrio un error") }
});


app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

const port = process.env.PORT || 4013;

app.listen(port, () => console.log(`User Notes API listening on port ${port}}!`))