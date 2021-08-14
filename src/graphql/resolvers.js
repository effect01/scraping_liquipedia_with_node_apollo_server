




module.exports ={
    Query: {
        Tournements : async (_,{game})=> await require('./resolvers/Tournement')(game),
        TournementsByStatus : async (_,{game,status})=> await require('./resolvers/Tournement')(game, status),
        MatchComingUp : async (_,{game})=> await require('./resolvers/matchComingUp')(game),
        ProTeams : async (_,{game, continent })=> await require('./resolvers/proTeams')(game,continent)
          
        
        
        
    }

}
