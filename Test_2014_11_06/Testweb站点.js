var http=require('http');
var url=require('url');
var qs=require('querystring');
//全局数据存储
var proverbs=[“事实胜于雄辩”,"there is a will,there is a way","功夫深铁成针"];
//创建web服务器
http.createServer(onRequest).listen(8888);
console.log("服务已经启动...");

//请求处理函数
function onRequest(request,response)
{
	var pathname=url.parse(request.url).pathname;
	console.log("请求"+pathname+"接收.")；
	if(pathname==="/"||pathname==="/index"||pathname==="/proverb")
	{
		getProverb(response);
	}
	else if(pathname==="/add")
	{
		if(request.method.toLowerCase()=='post')
		{
			var body='';
			request.on('data',function(data)
			{
				body+=data;
			});
			request.on('end',function()
			{
				var POST=qs.parse(body);
				add(POST.text,response);
			});
		}
		else
		{
			addProverb(response);
		}
	}
	else
	{
		response.writeHead(404,{"Content-Type":"text/plain"});
		response.write("404 Not foung");
		response.end();
	}
}

//Get请求
function getProverb(response)
{
	var body='<html>'
			 + '<head>'
			 + '<meta http-equiv="Content-Type" content="text/html; '
			 + 'charset=UTF-8" />'
			 + '</head>'
             + '<body style="font-size: 4em;line-height: 1.2; margin-top: 200;">'
             + '<blockquote>'+ proverbs[Math.floor(Math.random()* proverbs.length)]
                + '</blockquote>' + '</body>'
			 + '</html>'; 
	response.writeHead(200,{"Content-Type":"text/html"});	
	response.write(body);
	response.end();
}

//用户输入表单
function addProverb(response) { 
	 var body = '<html>'
			 + '<head>'
			 + '<meta http-equiv="Content-Type" content="text/html; '
			 + 'charset=UTF-8" />'
			 + '</head>'
             + '<body style="font-size: 4em;line-height: 1.2; margin-top: 200;">'
			 + '<form action="/add" method="post">'
			 + '<textarea name="text" rows="10" cols="60"></textarea><p>'
			 + '<input type="submit" value="Submit" />'
			 + '</form>' + '</body>'
			 + '</html>'; 

	 response.writeHead(200, { 
		"Content-Type" : "text/html"
	 }); 
	 response.write(body); 
	 response.end(); 

 }
 //用户POST请求
  function add(proverb, response) { 
	 proverbs.push(proverb); 

	 var body = '<html>'
			 + '<head>'
			 + '<meta http-equiv="Content-Type" content="text/html; '
			 + 'charset=UTF-8" />'
			 + '</head>'
             + '<body style="font-size: 4em;line-height: 1.2; margin-top: 200;">'
			 + '<blockquote>' + proverb + '</blockquote>' + '</body>'
			 + '</html>'; 

	 response.writeHead(200, { 
		"Content-Type" : "text/html"
	 }); 
	 response.write(body); 
	 response.end(); 

 }


















