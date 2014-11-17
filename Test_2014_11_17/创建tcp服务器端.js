var net=require('net');
var server=net.createServer(function(socket)
{
	socket.on('data',function(data)
	{
		console.log('i am coming');
		socket.write('hello:'+data);
	});
	
	socket.on('end',function()
	{
		console.log('end');
	});
	
	socket.write("welcome!");
});

server.listen(8124,function()
{
	console.log('server bound');
});

