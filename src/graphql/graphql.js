const { gql } = require("apollo-server-express")

module.exports = gql`
    type Query{
        Tournement(game:String!): Tournements
    }


    type Tournements {
        coming:[Tournement]
        current:[Tournement]
        recent:[Tournement]
    }
    type Tournement { 
        title: String 
        icon: String
        price: String
        teams: String
        location: String
        date: date

    }
    type date {
        start: String
        end: String
    }

`
