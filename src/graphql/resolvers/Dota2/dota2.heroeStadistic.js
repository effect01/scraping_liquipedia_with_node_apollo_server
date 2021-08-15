const scrapeIt = require("scrape-it");

async function scrapeDotaHeroStats() {
	const { data, error } = await scrapeIt(
		`https://liquipedia.net/dota2/Hero_statistics`,
		{
			presentations: {
				listItem: "table tbody > :not(:nth-child(1))",
				data: {
					name: "td:nth-child(1)",
					base_str: "td:nth-child(2)",
					base_agi: "td:nth-child(3)",
					base_int: "td:nth-child(4)",
					str_gain: "td:nth-child(5)",
					agi_gain: "td:nth-child(6)",
					int_gain: "td:nth-child(7)",
					base_dmg: "td:nth-child(8)",
					base_armor: "td:nth-child(9)",
					base_magicRes: "td:nth-child(10)",
					base_moveSpeed: "td:nth-child(11)",
					sight_day: "td:nth-child(12)",
					sight_night: "td:nth-child(13)",
					attack_type: "td:nth-child(14)",
					attack_range: "td:nth-child(15)",
					attack_point: "td:nth-child(16)",
					attack_backswing: "td:nth-child(17)",
					base_attack_time: "td:nth-child(18)",
					cast_point: "td:nth-child(19)",
					cast_backswing: "td:nth-child(20)",
					turn_rate: "td:nth-child(21)",
					url: {
						selector: "td:nth-child(1) a",
						attr: "href",
					},
				},
			},
		}
	);
	if (error) return error;

    console.log(data)
	return data.presentations;
}

module.exports = scrapeDotaHeroStats;
