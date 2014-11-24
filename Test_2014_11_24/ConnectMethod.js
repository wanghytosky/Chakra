var connect=require('connect'),
	http=require('http');
var app=connect()
		.use(access)
		.use(test);
	
function access(req,res,next)
{
	var now=new Date().getHours();
	var buf=new Buffer('下午1点之前禁止访问!','utf-8');
	if(now<13)
	{
		res.writeHead(503,{'Content-Type':'text/html;charset=utf-8'});
		res.end(buf);
	}
	else
	{
		next();
	}
}

function test(req,res)
{
	var buf=new Buffer('访问结束!','utf-8');
	res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
	res.end(buf);
}

http.createServer(app).listen(8887);