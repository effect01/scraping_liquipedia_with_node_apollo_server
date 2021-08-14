var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', async function(req, res) {
  try {


    res.json({mssg:'starting'} );
  } catch (e) {
    console.error('error at charger tournement');
  }
});

module.exports = router;
