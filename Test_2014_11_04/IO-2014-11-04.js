var iconv=require("iconv-lite");
process.nextTick(function()
{
	var arr=iconv.encode("nextTick�ӳ�ִ��",'gbk');
	console.log(arr);
});

setImmediate(function()
{	
	var arr=iconv.encode("setImmediate�ӳ�ִ��",'gbk');
	console.log(arr);
});
var arr=iconv.encode("����ִ��",'gbk');
console.log(arr);

