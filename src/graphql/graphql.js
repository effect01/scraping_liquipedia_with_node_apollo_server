const { gql } = require("apollo-server-express")

module.exports = gql`
    type Query{
        Tournements(game:String!): [Tournement!]
        TournementsByStatus(game:String!, status:String!): [Tournement!]
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