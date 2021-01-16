const { Router } = require('express');
const connection = require('../connection');

const router = Router();

console.log(router)

router.get('/', (req, res) => {
    res.send('Service is running!');
})

module.exports = router;