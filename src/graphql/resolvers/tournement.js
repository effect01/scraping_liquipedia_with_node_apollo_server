
const scrapeIt = require("scrape-it");
/* GET home page. */
module.exports  =  async (game) => {
  try {
    console.log(game)
    const result = await scrapeItExample(game);
    const comingUpMatch = result.filter(e => e.date.start > new  Date() );
    const currentMatch = result.filter(e =>  e.date.start > new  Date()  && e.date.end < new  Date() );
    const recentMatch = result.filter(e => e.date.end < new  Date() );

    console.log( result.length,  comingUpMatch.length,currentMatch.length, recentMatch.length )   
    console.log(
      {
        coming: comingUpMatch,
        current: currentMatch,
        recent: recentMatch
    
    } 
    )
    const response = {
      coming: comingUpMatch,
      current: currentMatch,
      recent: recentMatch
  
  }  
   return response;

  } catch (e) {
    console.error('error at charger tournement');
  }


}

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

});

return data;
}
