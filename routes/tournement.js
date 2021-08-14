var express = require('express');
var router = express.Router();
const scrapeIt = require("scrape-it");
/* GET home page. */
router.get('/', async function(req, res) {
  try {
    const result = await scrapeItExample('dota2');
    const comingUpMatch = result.filter(e => e.date.start > new  Date() );
    const currentMatch = result.filter(e =>  e.date.start > new  Date()  && e.date.end < new  Date() );
    const recentMatch = result.filter(e => e.date.end < new  Date() );

    console.log( result.length,  comingUpMatch.length,currentMatch.length, recentMatch.length )   
    res.json({
        coming: comingUpMatch,
        current: currentMatch,
        recent: recentMatch
    
    } );

  } catch (e) {
    console.error('error at charger tournement');
  }
});

module.exports = router;


async function scrapeItExample(game) {
  let {data,error} = await scrapeIt(`https://liquipedia.net/${game}/Portal:Tournaments`, {
      presentations: {
          listItem: 'div.divRow',
          data: {
      
            title: '.divCell.Tournament.Header',
            icon:{
              selector:'.league-icon-small-image > a',
              attr:'href'
             },
            price: '.divCell.EventDetails.Prize.Header',
            teams: '.divCell.EventDetails.PlayerNumber.Header',
            location:'.divCell.EventDetails.Location.Header',
            date: '.divCell.EventDetails.Date.Header',
  
          }
      }
  });
  if (error) return error;
    data = data.presentations.map(e => {
    switch(e.date.replace(',','').split(' ').length)
    {
        // in 1 day 
        case 3:
            const date =  new Date(` ${e.date.replace(',','').split(' ') [0]} ${e.date.replace(',','').split(' ') [1]} ${e.date.replace(',','').split(' ')  [2]}`)
            e.date = {
             start:date,
             end: date
            }
            break;
        // in the same month
        case 5:
            e.date = {
             start:new Date(` ${e.date.replace(',','').split(' ') [0]} ${e.date.replace(',','').split(' ') [1]} ${e.date.replace(',','').split(' ')  [e.date.replace(',','').split(' ').length-1]}`),
             end: new Date(` ${e.date.replace(',','').split(' ') [0]} ${e.date.replace(',','').split(' ') [2]} ${e.date.replace(',','').split(' ')  [e.date.replace(',','').split(' ').length-1]}`)
            }
            break;
        // beetwen 2 month
        case 6:
            e.date = {
                start:new Date(` ${e.date.replace(',','').split(' ') [0]} ${e.date.replace(',','').split(' ') [1]} ${e.date.replace(',','').split(' ')  [e.date.replace(',','').split(' ').length-1]}`),
                end: new Date(` ${e.date.replace(',','').split(' ') [2]} ${e.date.replace(',','').split(' ') [3]} ${e.date.replace(',','').split(' ')  [e.date.replace(',','').split(' ').length-1]}`)
            }
            break;
    }
    return e;

})

 return data;

}