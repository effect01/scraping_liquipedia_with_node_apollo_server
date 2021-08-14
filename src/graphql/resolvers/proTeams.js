const scrapeIt = require("scrape-it");


module.exports = async function scrapeTeams(game,site) {
    let { data, error } = await scrapeIt(
        `https://liquipedia.net/${game}/Portal:Teams/${site}`,
        {
            presentations: {
                listItem: "tbody",
                data: {
                    title: ".team-template-text",
                    logo:{
                        selector: "span a img",
                        attr: "src"
                    },
                    url: {
                        selector: "span.team-template-text  a",
                        attr: "href"
                    },
                    players: {
                        listItem: "tr:not(:nth-child( 1), :nth-child( 2) , :last-child)",
                        data: {
                            country: {
                                selector: "td:nth-child(1) span a",
                                attr: "title",
                            },
                            id: "td:nth-child(1)",
                            url: {
                                selector: "td:nth-child(1) > a",
                                attr: "href",
                            },
                            name: "td:nth-child(2)",
                        },
                    },
                },
            },
        }
    );
    if (error) return error;
    return data.presentations;
}