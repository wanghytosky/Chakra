var fs=require("fs");
var iconv=require("iconv-lite");
var file="D:\NodeSpace\TestFiles";
writeFile(file);
readFile(file);

function writeFile(file)
{
	var str="\r\n�ҽ���������ڽ������";
	var arr=iconv.encode(str,'gbk');
	console.log(arr);
	fs.appendFile(file,arr,function(err)
	{
		if(err)
		{
			console.log("ʧ��"+err);
		}else
		{
			console.log("д���ļ�");
		}
	});
}

function readFile(file)
{
	fs.readFile(file,function(err,data)
	{
		if(err)
		{
			console.log("��ȡ�ļ�ʧ��"+err);
		}else
		{
			console.log(data);
			var str=iconv.decode(data,'gbk');
			console.log(str);
		}
	});
}