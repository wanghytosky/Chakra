
function handles()
{

}
handles.index={};//����ԭ���൱�ھ�̬����
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
	console.log('splice(3)���:'+args);
	handles['index']['index'].apply(null,[req,res].concat(args));//һ������ �൱�� �����е�this  �����null �����ȫ�ֱ��� node���൱��global js�� window
}).listen(8887,'127.0.0.1');