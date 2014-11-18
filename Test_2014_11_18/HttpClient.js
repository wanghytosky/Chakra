var options=
{
	hostname:'127.0.0.1',
	port:8887,
	path:'/',
	method:'GET'
};
var http=require('http');
var req=http.request(options,function(res)
{
	var i=0;
	console.log('STATUS:'+res.statusCode);
	console.log('HEADERS'+JSON.stringify(res.headers));
	res.setEncoding('utf8');
	res.on('data',function(chunk)
	{
		i++;
		console.log(chunk+'A');
		console.log(i);
	});
});

req.end();