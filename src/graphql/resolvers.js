




module.exports ={
    Query: {
        Tournement : async (_,{game})=> { 
            const data = await require('./resolvers/Tournement')(game)
            return  data;
        }
        
    }

}
