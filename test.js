var fs=require("fs");
var iconv=require("iconv-lite");
var file="D:\NodeSpace\TestFiles";
writeFile(file);
readFile(file);

function writeFile(file)
{
	var str="\r\n我叫王涵杨，我在解决乱码";
	var arr=iconv.encode(str,'gbk');
	console.log(arr);
	fs.appendFile(file,arr,function(err)
	{
		if(err)
		{
			console.log("失败"+err);
		}else
		{
			console.log("写入文件");
		}
	});
}

function readFile(file)
{
	fs.readFile(file,function(err,data)
	{
		if(err)
		{
			console.log("读取文件失败"+err);
		}else
		{
			console.log(data);
			var str=iconv.decode(data,'gbk');
			console.log(str);
		}
	});
}