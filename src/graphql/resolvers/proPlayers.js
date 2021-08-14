const scrapeIt = require("scrape-it");

module.exports = async function scrapePlayers(game, site) {
	let { data, error } = await scrapeIt(
		`https://liquipedia.net/${game}/Portal:Players/${site}`,
		{
			presentations: {
				listItem: "tbody >:not( :nth-child( 1), :nth-child( 2))",
				data: {
					country: {
						selector: "td:nth-child(1) span a",
						attr: "title",
					},
					id: "td:nth-child(2)",
					name: "td:nth-child(3)",
					team: {
						listItem: "td:nth-child(4)",
						data: {
						
							name:"div :nth-child(2)  a" ,
							img_url: {
								selector:"div .visible-xs a img",
								attr: "src",
							},
                            url: {
								selector: "div :nth-child(2) a",
								attr: "href",
							},
                           
                         
						},
					},
				},
			},
		}
	);
    console.log(data.presentations)
	if (error) return error;
	return data.presentations;
};
