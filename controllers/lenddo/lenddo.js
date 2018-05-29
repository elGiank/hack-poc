const router = require('express').Router();
const ScoreHandler = require('./scoreHandler');

router
    .get('/', (req, res) => {
        res.send("Lendo API get locked and load");
    })
    .post('/', (req, res) => {
        let scoreData = req.body;
        console.log(scoreData);
        ScoreHandler(req, res);
    })
    .get('/test', (req, res) => {

    });

module.exports = router;