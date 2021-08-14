
const scrapeIt = require("scrape-it");
const { fixDate } = require('./utils');
/* GET home page. */
module.exports  =  async (game,status) => {
  try {
    const result = await scrapeItData(game);
    if(!status)  return result;

    if(status){
      const today = new  Date().toISOString();
      switch(status){
        case "comingUp":
          const comingUpMatch = result.filter(e =>  e.date.start > today ||  e.date.start  === 'TBA'  );
          return comingUpMatch;
        case "current":
          const currentMatch = result.filter(e => e.date.start <= today  &&  ( e.date.end >= today ||  e.date.end === 'TBA' ));
          return currentMatch;
        case "recent":
          const recentMatch = result.filter(e => e.date.end  !== 'TBA'  && e.date.end < today);
          return recentMatch;
        default:
          return result;
    }
  }



  } catch (e) {
    console.error('error at charger tournement');
  }


}

async function scrapeItData(game) {
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
            winner: '.divCell.Placement.FirstPlace',
            second: '.divCell.Placement.SecondPlace'
  
          }
      }
  });
  if (error) return error;
  data = fixDate(data);
  return data;
}
