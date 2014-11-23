var http=require('http');
var mongoose=require('mongoose');
var db=mongoose.createConnection('mongodb://localhost:27017/MonitorLog');

var monitorSchema=new mongoose.Schema(
{
	hostname:String,
	info:String
});

http.createServer(function(req,res)
{
	insertIntoMongoDB(req,res);
}).listen(8887,'127.0.0.1');

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
var jsonStr={hostname:'127.0.0.1',info:'测试mongo请求,时间:'+new Date()};
function insertIntoMongoDB(req,res)
{
	try
	{
		var PersonModel=db.model('MonitorLog',monitorSchema);
		var PersonEntity=new PersonModel({hostname:jsonStr.hostname,info:jsonStr.info});
		PersonEntity.save();		
	}
	catch(err)
	{
		console.log('出现异常:'+err);
	}
}