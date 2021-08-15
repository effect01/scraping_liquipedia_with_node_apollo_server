const scrapeIt = require("scrape-it");
const {fixDate} = require("./utils");

async function scrapePrizesWonByTeams(game) {
	let { data, error } = await scrapeIt(
		`https://liquipedia.net/${game}/Portal:Statistics/Team_earnings`,
		{
			presentations: {
				listItem: "tbody >:not(:nth-child( 1))",
				data: {
					place: "td:nth-child(1)",
					team: {
						data: {
							url: {
								selector: "td:nth-child(2) span[class*='team-template-image-'] a",
								attr: "href",
							},
							img_url: {
								selector: 'td:nth-child(2) span[class*="team-template-image-"] a img',
								attr: "src",
							},
							name: "td:nth-child(2) .team-template-text",
						},
					},
					firstPlaces: "td:nth-child(3)",
					secondPlaces: "td:nth-child(4)",
					thirdPlaces: "td:nth-child(5)",
					tierS: "td:nth-child(6)",
					earning: "td:nth-child(7)",
				},
			},
		}
	);
	if (error) return error;
    console.log(data)
	return data.presentations;
}

async function scrapePrizesWonByPlayers(game) {
	let { data, error } = await scrapeIt(
		`https://liquipedia.net/${game}/Portal:Statistics/Player_earnings`,
		{
			presentations: {
				listItem: "tbody >:not(:nth-child( 1))",
				data: {
					place: "td:nth-child(1)",
					name: "td:nth-child(3)",
					country: {
						selector: "span a",
						attr: "title",
					},
					firstPlaces: "td:nth-child(4)",
					secondPlaces: "td:nth-child(5)",
					thirdPlaces: "td:nth-child(6)",
					tiers_s: "td:nth-child(7)",
					earning: "td:nth-child(8)",
				},
			},
		}
	);
	if (error) return error;
	return data.presentations;
}

async function scrapePrizesTournement(game) {
	let { data, error } = await scrapeIt(
		`https://liquipedia.net/${game}/Portal:Statistics/Tournament_prize_pools`,
		{
			presentations: {
				listItem: ".divTable.table-full-width.tournament-card > .divRow",
				data: {
					place: "div:nth-child(1)",
					name: "div:nth-child(2)",
					organizer: "div:nth-child(3)",
					prizePool: "div:nth-child(5)",
					teams: "div:nth-child(6)",
					date: "div:nth-child(4) ",
					location: {
						selector: "div:nth-child(7) ",
					},
					winner: "div:nth-child(8)",
					runnerUp: "div:nth-child(9)",
				},
			},
		}
	);
	if (error) return error;
	data.presentations.forEach(
		(e) => (e.date = e.date.substr(10, e.date.length - 1))
	);
	data = fixDate(data);

	return data;
}


module.exports = { scrapePrizesTournement ,  scrapePrizesWonByPlayers, scrapePrizesWonByTeams };