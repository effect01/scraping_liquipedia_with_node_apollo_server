




module.exports ={
    Query: {
        Tournements : async (_,{game})=> await require('./resolvers/Tournement')(game),
        TournementsByStatus : async (_,{game,status})=> await require('./resolvers/Tournement')(game, status),
        MatchComingUp : async (_,{game})=> await require('./resolvers/matchComingUp')(game),
        ProTeams : async (_,{game, continent })=> await require('./resolvers/proTeams')(game,continent),
        ProPlayers : async (_,{game, continent })=> await require('./resolvers/proPlayers')(game,continent),
        prizesWonByTeams : async (_,{game })=> {
            let {scrapePrizesWonByTeams} = await require('./resolvers/prizes');
            return scrapePrizesWonByTeams(game);
        },
        prizesWonByPlayers : async (_,{game })=> {
            const { scrapePrizesWonByPlayers } = await require('./resolvers/prizes')
            return scrapePrizesWonByPlayers(game)
        },
        totalPrizesByTournement : async (_,{game })=> { 
            const { scrapePrizesTournement } = await require('./resolvers/prizes');
            return scrapePrizesTournement(game)
        }
        
        
    }

}
