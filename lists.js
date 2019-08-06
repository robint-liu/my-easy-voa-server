const http = require('http');
const cheerio = require('cheerio');

let result = null;
module.exports = () => {
	const url = {
		host:"www.easyvoa.com",
		path:"/voa-standard-english/mp3/index.html",
		method:"POST"
	}
	const request = http.request(url, (res) => {	
		if (res.statusCode===200) {
			let str = '';
			res.on("data", (data) => {
				str += data;
			});
			res.on("end", () => {
				const $=cheerio.load(str);
				let resu=$("#new_news li");
				var homeList = [];
				for(let i=0;i<resu.length;i++) {
					var obj = {};
					var info1 = resu.eq(i).find("a").last().attr("href")
					.split("/");
					var id = info1[info1.length-1].split(".")[0];
					var title = resu.eq(i).find("a").last().text().split(["("])[0];
					var pubdate = resu.eq(i).find("a").last().find("span").text();
					var link = resu.eq(i).find("a").last().attr("href");
					obj = {
						"id":id,
						"titlefont":title,
						"pubdate":pubdate,
						"link":link
					}
					homeList.push(obj)		
				}
				result = null;
				result = {
					"ret":true,
					"secondFloor": "VOA常速英语",
				    "thirdFloor": "VOA常速英语音频",
				    "pageMaxnum":24,
				    "pageMinnum":0,
					"data":homeList
				}
			});
		}
	})
	request.end()
	return result;
}