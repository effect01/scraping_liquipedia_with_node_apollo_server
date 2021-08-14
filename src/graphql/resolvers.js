




module.exports ={
    Query: {
        Tournements : async (_,{game})=> { 
            const data = await require('./resolvers/Tournement')(game)
            return  data;
        },
        TournementsByStatus : async (_,{game,status})=> {
            const data = await require('./resolvers/Tournement')(game, status)
            return  data;
        }
        
    }

}
