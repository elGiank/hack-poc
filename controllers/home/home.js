const router = require('express').Router();

router
    .get('/', (req, res) => {
        res.send("Hawk API locked and loaded");
    });

module.exports = router;