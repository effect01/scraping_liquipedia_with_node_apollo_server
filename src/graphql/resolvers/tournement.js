
const scrapeIt = require("scrape-it");
/* GET home page. */
module.exports  =  async (game,status) => {
  try {
    const result = await scrapeItData(game);
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

   return result;

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

  data = data.presentations.map(e => {
  const dateArray = e.date.replace(',','').split(' ') ;
  switch(dateArray.length)
    {
        // in 1 day 
        case 3:
            e.date = {
             start: createDate(0,1,2 , dateArray),
             end:  createDate(0,1,2 , dateArray) 
            }
            break;
        // in the same month
        case 5:

            e.date = {
             start:    createDate(0,1,dateArray.length-1, dateArray),
             end:   createDate(0,3,dateArray.length-1, dateArray)
            }
            break;
        // beetwen 2 month
        case 6:
            e.date = {
                start: createDate(0,1,dateArray.length-1, dateArray) ,
                end:  createDate(3,4,dateArray.length-1, dateArray)
            }
            break;
        default:
            e.date = {
              start:   createDate(0,1,2 , dateArray), 
              end:   createDate(0,1,2 , dateArray)
            }
            break;
    }
    return e;

});

return data;
}


const getDate = (month,day, year , dateArray)=>  new Date(` ${dateArray [month]} ${dateArray [day]} ${dateArray  [year]}`);
const verifyIsNotTBA =(date, array) => array[0] !== 'TBA' &&  array[array.length-1] !== 'TBA'?  date.toISOString() :'TBA';
const createDate =(day,month,year , dateArray) => verifyIsNotTBA(  getDate(day,month,year , dateArray), dateArray);