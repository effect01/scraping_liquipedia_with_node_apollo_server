const { gql } = require("apollo-server-express")

module.exports = gql`
    type Query{
        Tournements(game:String!): [Tournement!]
        TournementsByStatus(game:String!, status:String!): [Tournement!]
        MatchComingUp(game:String!): [Match!]
        ProTeams(game:String!, continent:String!): [ProTeam!]
    }
    type Match {
        team1: Team
        team2: Team
        scoreboard: String!
        bestOf_: String!
        date: String
        league: League
    }

    type ProTeam {
        title: String!
        logo: String!
        url: String!
        players: [Roster!]
    }

    type Roster {
        country: String!
        id: String!
        name: String!
        url: String!
    }


    type Team {
        name: String!
        img_url: String!
        url: String!
    }
    type League {
        name: String!
        img_url: String!
        url: String!
    }
    type Tournement { 
        title: String 
        icon: String
        price: String
        teams: String
        location: String
        date: date
        winner: String
        second: String

    }
    type date {
        start: String
        end: String
    }



`
    // type Tournements {
    //     coming:[Tournement]
    //     current:[Tournement]
    //     recent:[Tournement]
    // }