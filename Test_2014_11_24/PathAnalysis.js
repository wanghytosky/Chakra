
function handles()
{

}
handles.index={};//不加原型相当于静态方法
handles.index.index=function(req,res,foo,bar)
{
	console.log(foo);
	console.log(bar);
	res.writeHead(200);
	res.end('asdasdasdasd!');
}
var http=require('http');
http.createServer(function(req,res)
{
	var arr=[1,2,3,4,5,6,7];
	var args=arr.splice(3);
	console.log('splice(3)结果:'+args);
	handles['index']['index'].apply(null,[req,res].concat(args));//一个参数 相当于 方法中地this  如果是null 则代表全局变量 node中相当于global js中 window
}).listen(8887,'127.0.0.1');