var http=require('http');
var mongoose=require('mongoose');
var db=mongoose.createConnection('mongodb://localhost:27017/MonitorLog');
var querystring = require("querystring");

var monitorSchema=new mongoose.Schema(
{
	hostname:String,
	info:String
});

http.createServer(function(req,res)
{
	insertIntoMongoDB(req,res);
}).listen(8887,'192.168.199.104');

db.on('error',function(error)
{
	console.log(error);
	mongoose.connection.close(function()
	{
		console.log('mongdb连接关闭');
	});
});
db.once('open',function()
{
	//打开记录
	console.log('mongoDB被打开');
});
//var jsonStr={hostname:'127.0.0.1',info:'测试mongo请求,时间:'+new Date()};
function insertIntoMongoDB(req,res)
{
	try
	{
		var data='';
		var jsonStr={};
		//console.log(JSON.stringify(req.headers));
		//console.log(JSON.stringify(req));
		req.setEncoding("utf8");
		req.on('data',function(chunk)
		{
			console.log(chunk);
			data+=chunk;
			console.log(data);
		}).on('end',function()
		{
			console.log('接收完成');
			jsonStr=JSON.parse(data);
			console.log(jsonStr.hostname);
			console.log(jsonStr.info);
			var PersonModel=db.model('MonitorLog',monitorSchema);
			var PersonEntity=new PersonModel({hostname:jsonStr.hostname,info:jsonStr.info});
			PersonEntity.save();
			res.writeHead(200,{'Content-Type':'text/plain'});
			res.end('Hello World!');
		});
		//var objectPostData = querystring.parse(data);
	}
	catch(err)
	{
		console.log('出现异常:'+err);
	}
}