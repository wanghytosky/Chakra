//这个模块可以帮助你计算BML值
var yourname,
h=0,
w=0,
result;

exports.setName=function(username,userh,userw)
{
	console.log('123');
	yourname=username;
	h=userh;
	w=userw;
};
exports.countBMI=function()
{
	result=Math.floor(w/(h*h));
	console.log("Hello "+yourname+"! \n 你的 BMI 是 "+result);
};