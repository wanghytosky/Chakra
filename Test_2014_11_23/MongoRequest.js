var http=require('http');
var options=
{
	hostname:'127.0.0.1',
	port:8887,
	path:'/',
	method:'Get'
};
var jsonStr={hostname:'127.0.0.1',info:'测试mongo请求,时间:'+new Date()};
var req=http.request(options,function(err,res)
{
	console.log(res.statusCode);
	res.on('error',function(err)
	{
		console.log('请求异常:'+JSON.stringify(err));
	});
});
req.end(function()
{
	console.log('请求结束');
});

