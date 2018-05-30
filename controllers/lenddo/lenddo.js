const router = require('express').Router();
const ScoreHandler = require('./scoreHandler');
const TestHandler = require('./testHandler');

router
    .get('/status', (req, res) => {
        res.send("Lendo API get locked and load");
    })
    .get('/', (req, res) => {
        let scoreData = req.body;
        console.log(scoreData);
        ScoreHandler(req, res);
    })
    .get('/test', (req, res) => {
        TestHandler(res);
    });

module.exports = router;