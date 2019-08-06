const http = require('http');
const cheerio = require('cheerio');

let result = null;
module.exports = () => {
	const url = {
		host:"www.easyvoa.com",
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
				let resu=$("#title li");
				var list = [];
				for(let i=0;i<resu.length;i++) {
					var obj = {};
					var id = "100"+i;
					var title = resu.eq(i).find("a").last().text();
					var link = resu.eq(i).find("a").last().attr("href");
					console.log()
					obj = {
						"id":id,
						"title":title,
						"link":link
					}
					list.push(obj)		
				}
				result = null;
				result = {
					"ret":true,
					"data":{
						"list":list
					}
				}
			});
		}
	})
	request.end();
	return result;
}