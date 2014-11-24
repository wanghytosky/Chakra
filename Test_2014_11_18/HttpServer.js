var http=require('http');
http.createServer(function(req,res)
{
	console.log(req.headers);
	var buffers=[];
	buffers[0]="A";
	req.on('data',function(trunk)
	{
		buffers.push(trunk);
	}).on('end',function()
	{
		var buffer=Buffer.concat(buffers);
		res.writeHead(200,{'Content-Type':'text/plain'});
		res.end('Hello World\nHello World\nHello World\nHello World\nHello World\nHello World\nHello World\nHello World\nHello World\nHello World\nHello World\nHello World\nHello World\nHello World\nHello World\nHello World\nHello World\nHello World\nHello World\nHello World\nHello World\nHello World\n');
	});	
}).listen(8887,'127.0.0.1');
console.log('Server running at http://127.0.0.1:8887/');