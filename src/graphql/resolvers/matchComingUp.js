
const scrapeIt = require("scrape-it");

module.exports = async function scrapeMatchUpAndComingup(game) {
	let { data, error } = await scrapeIt(
		`https://liquipedia.net/${game}/Liquipedia:Upcoming_and_ongoing_matches`,
		{
			presentations: {
				listItem: "div[data-toggle-area-content=1] > table tbody",
				data: {
					team1: {
						data: {
							acronym: "tr:nth-child(1) .team-left ",
							name: {
								selector: "tr:nth-child(1) .team-left > span ",
								attr: "data-highlightingclass",
							},
							img_url: {
								selector:
									'tr:nth-child(1) .team-left  span[class*="team-template-image-"] a img',
								attr: "src",
							},
							url: {
								selector: "tr:nth-child(1) .team-left .team-template-text  > a",
								attr: "href",
							},
						},
					},
					team2: {
						data: {
							acronym: "tr:nth-child(1) .team-right ",
							name: {
								selector: "tr:nth-child(1) .team-right > span ",
								attr: "data-highlightingclass",
							},
							img_url: {
								selector:
									'tr:nth-child(1) .team-right  span[class*="team-template-image-"] a img',
								attr: "src",
							},
							url: {
								selector:
									"tr:nth-child(1) .team-right  .team-template-text  >  a",
								attr: "href",
							},
						},
					},
					scoreboard: "tr:nth-child(1) .versus > div:nth-child(1)",
					bestOf_: "tr:nth-child(1) .versus > :nth-child(2)",
					date: "tr:nth-child(2) td.match-filler  span.match-countdown",
					league: {
						data: {
							name: "tr:nth-child(2) td.match-filler div > div > a",
							url: {
								selector: "tr:nth-child(2) td.match-filler  span a",
								attr: "href",
							},
							img_url: {
								selector: "tr:nth-child(2) td.match-filler  span a img",
								attr: "src",
							},
						},
					},
				},
			},
		}
	);
	if (error) return error;

	return data.presentations;
}
