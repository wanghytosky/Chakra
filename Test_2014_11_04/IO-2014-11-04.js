var iconv=require("iconv-lite");
process.nextTick(function()
{
	var arr=iconv.encode("nextTick延迟执行",'gbk');
	console.log(arr);
});

setImmediate(function()
{	
	var arr=iconv.encode("setImmediate延迟执行",'gbk');
	console.log(arr);
});
var arr=iconv.encode("正常执行",'gbk');
console.log(arr);

