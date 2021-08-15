const scrapeIt = require("scrape-it");

async function scrapeDotaItemStats() {
	let { data, error } = await scrapeIt(
		`https://liquipedia.net/dota2/Item_statistics`,
		{
			presentations: {
				listItem: "table tbody > :not(:nth-child(1))",
				data: {
					name: "td:nth-child(1)",
					price: "td:nth-child(2)",
					str: "td:nth-child(3)",
					agi: "td:nth-child(4)",
					int: "td:nth-child(5)",
					health: "td:nth-child(6)",
					mana: "td:nth-child(7)",
					hp_reg: "td:nth-child(8)",
					mana_reg: "td:nth-child(9)",
					armor: "td:nth-child(10)",
					evasion: "td:nth-child(11)",
					resistance: "td:nth-child(12)",
					spell_amp: "td:nth-child(13)",
					physical_dmg: "td:nth-child(14)",
					attack_speed: "td:nth-child(15)",
					movement_speed: "td:nth-child(16)",
					type: "td:nth-child(17)",
					url: {
						selector: "td:nth-child(1) a",
						attr: "href",
					},
				},
			},
		}
	);
	if (error) return error;
    console.log(data.presentations)
	return data.presentations;
}
module.exports = scrapeDotaItemStats;
