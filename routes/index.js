var express = require('express');
var router = express.Router();
const scrapeIt = require("scrape-it");
/* GET home page. */
router.get('/', async function(req, res) {
  try {


    res.json({mssg:'hello world'} );
  } catch (e) {
    console.error('error');
  }
});
