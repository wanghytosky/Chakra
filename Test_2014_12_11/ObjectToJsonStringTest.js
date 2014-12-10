function dataModel()
{
	this.id = 5;
	this.name = 'myclass';
}

dataModel.prototype.age=10;
console.log(JSON.stringify(new dataModel().age));

var http=require('http');

http.createServer(function(req,res)
{
	console.log('createServer Start!');
	req.on('data',function(trunk)
	{
		console.log("start to recieve!");
	}).on('end',function()
	{

		var obj=new dataModel();
		console.log('createServer End!');
		var strss=JSON.stringify(obj);
		console.log(strss);
	});	
}).listen(8887,'127.0.0.1');;