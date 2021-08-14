

const getDate = (month,day, year , dateArray)=>  new Date(` ${dateArray [month]} ${dateArray [day]} ${dateArray  [year]}`);
const verifyIsNotTBA =(date, array) => array[0] !== 'TBA' &&  array[array.length-1] !== 'TBA'?  date.toISOString() :'TBA';
const createDate =(day,month,year , dateArray) => verifyIsNotTBA(  getDate(day,month,year , dateArray), dateArray);
// Ago 12 2021 (length =  3)  Ago 12 - 15 2021 (length =  5)  Ago 12 - Sep 15 2021 (length =  6)
const fixDate = (data) => data.presentations.map(e => {
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
  
  } );


module.exports = {createDate, fixDate , getDate, verifyIsNotTBA}