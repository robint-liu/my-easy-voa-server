let http = require('http'); 
let cheerio = require('cheerio');
const home = require('./home.js')
const common = require('./common.js')
const details = require('./details.json')
const lists = require('./lists.js')  

let server = http.createServer(function(req, res) {
    let str = ''; 
    req.on('data', function(data) {
        str +=data;
        str = JSON.parse(str);
    });
    req.on('end', function() { 
        res.writeHead(200, {  // 响应状态
            "Accept":"application/json",
            "Content-Type": "application/json",  // 响应数据类型
            'Access-Control-Allow-Origin': '*',  // 允许任何一个域名访问
            "charset": "utf-8'"
        });
        //逻辑判断，执行相应的接口
        if (str.name==="home") {
            res.end(JSON.stringify(home()));
        }else if (str.name==="common") {
            res.end(JSON.stringify(common()));
        }else if (str.name==="details") {
            res.end(JSON.stringify(details));
        }else if (str.name==="lists") {
            res.end(JSON.stringify(lists()));
        }else{
            res.end()
        }
    });
});

server.listen(9000);