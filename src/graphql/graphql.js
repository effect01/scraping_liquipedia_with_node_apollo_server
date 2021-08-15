const { gql } = require("apollo-server-express")

module.exports = gql`
    type Query{
        Tournements(game:String!): [Tournement!]
        TournementsByStatus(game:String!, status:String!): [Tournement!]
        MatchComingUp(game:String!): [Match!]
        ProTeams(game:String!, continent:String!): [ProTeam!]
        ProPlayers(game:String!, continent:String!): [ProPlayers!]
        prizesWonByTeams(game:String!): [PrizesByTeam!]
        prizesWonByPlayers(game:String!): [PrizesByPlayer!]
        totalPrizesByTournement(game:String!): [TournementPoolPrize!]
        dota2HeroesStats (game:String!): [DotaHeroeStats!]
        dota2ItemStats (game:String!): [Dota2ItemsStats!]
    }



   
    type TournementPoolPrize{
        place: String!
        name: String!
        location: String
        winner: String
        runnerUp: String
        teams: String
        prizePool: String
        organizer: String
    }

    type PrizesByPlayer{
        place: String!
        name: String!
        country: String
        firstPlaces: String
        secondPlaces: String
        thirdPlaces: String
        tiers_s: String
        earning: String
    }
    type PrizesByTeam {
        place: String
        team: Team
        firstPlaces: String
        secondPlaces: String
        thirdPlaces: String
        tierS: String
        earning: String
    }


    type ProPlayers {
        id: String!
        country: String
        name: String
        team: [Team]
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
        name: String
        img_url: String
        url: String
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

    type DotaHeroeStats {
        name: String!
        base_str: String!
        base_agi: String!
        base_int: String!
        str_gain: String!
        agi_gain: String!
        int_gain: String!
        base_dmg: String!
        base_armor : String!
        base_magicRes: String!
        base_moveSpeed: String!
        sight_day: String!
        sight_night: String!
        attack_type: String!
        attack_range: String!
        attack_point: String!
        attack_backswing: String!
        base_attack_time: String!
        cast_point: String!
        cast_backswing: String!
        turn_rate: String!
        url: String!
    }
    type Dota2ItemsStats {
        name: String!
        price: String!
        str: String!
        agi: String!
        int: String!
        health: String!
        mana: String!
        hp_reg: String!
        mana_reg: String!
        armor: String!
        evasion: String!
        resistance: String!
        spell_amp: String!
        physical_dmg: String!
        attack_speed: String!
        movement_speed: String!
        type: String!
        url: String!

    }




`
