var redis=require('redis');
var client = redis.createClient('Port','IP');
var http=require('http');
var newDate=new Date();
var MAX = 1000000000, MIN = 0;
client.auth("password");
client.on('error',function(error)
{
	console.log("出现异常:"+error);
	client.quit();
});

http.createServer(function(req,res)
{
	console.log('createServer Start!');
	req.on('data',function(trunk)
	{
		console.log("start to recieve!");
	}).on('end',function()
	{
		console.log('createServer End!');
		FillDataModel();
		var bbData=BlackBoardData();
		
	});	
}).listen(8887,'127.0.0.1');
console.log('start to listening');

function FillDataModel()
{
	var arr=new Array();
	client.select('1', function(error)	
	{
		if(error) 
		{
			console.log(error);
		} 
		else 
		{
			dataModel.prototype.Mip=GetStringDataFromRedis('Mip');
			dataModel.prototype.Mpv=GetStringDataFromRedis('Mpv');
			dataModel.prototype.Muv=GetStringDataFromRedis('Muv');
			dataModel.prototype.OrderCountALL=GetStringDataFromRedis('WebSta_OrderCountALL');
			dataModel.prototype.OrderCountPaid=GetStringDataFromRedis('WebSta_OrderCountPaid');
			dataModel.prototype.OrderCountAoyou=GetStringDataFromRedis('WebSta_OrderCountAoyou');
			dataModel.prototype.OrderMoney=GetStringDataFromRedis('WebSta_OrderMoney');
			dataModel.prototype.OrderMoneyAoyou=GetStringDataFromRedis('WebSta_OrderMoneyAoyou');
			dataModel.prototype.GuestNum=GetStringDataFromRedis('WebSta_GuestNum');
			dataModel.prototype.GuestNumAoyou=GetStringDataFromRedis('WebSta_GuestNumAoyou');
			dataModel.prototype.MemberCount=GetStringDataFromRedis('WebSta_MemberCount');
			dataModel.prototype.MemberCountAoyou=GetStringDataFromRedis('WebSta_MemberCountAoyou');
			dataModel.prototype.OnlinePayRecordCount=GetStringDataFromRedis('WebSta_OnlinePayRecordCount');
			dataModel.prototype.OnlinePayOrderCount=GetStringDataFromRedis('WebSta_OnlinePayOrderCount');
			dataModel.prototype.OnlinePayMoney=GetStringDataFromRedis('WebSta_OnlinePayMoney');				
			//TODO:取集合并赋值
			dataModel.prototype.botname=GetRedisJsonDataWithPercent(Get_ZrevRangeByScoreData(GetNowFormatDate() + "botname",0,10));
			dataModel.prototype.rdomain=GetRedisJsonDataWithPercent(Get_ZrevRangeByScoreData(GetNowFormatDate() + "rdomain",0,10));		
			//TODO:赋值
			GetRedisTops(Get_ZrevRangeByScoreData(GetNowFormatDate() + "moduleid",0,50),arr);
			dataModel.prototype.moduleid1=arr[0];
			dataModel.prototype.moduleid2=arr[1];
			dataModel.prototype.moduleid3=arr[2];
			dataModel.prototype.moduleid4=arr[3];
			dataModel.prototype.moduleid5=arr[4];
			dataModel.prototype.moduleid6=arr[5];
			dataModel.prototype.moduleid7=arr[6];	
		}
	});

	client.select('0', function(error)	
	{
		if(error) 
		{
			console.log(error);
		} 
		else 
		{
			dataModel.prototype.d11_tel=GetStringDataFromRedis('d11_tel');
			dataModel.prototype.d11_Activity=GetStringDataFromRedis('d11_tel');
			dataModel.prototype.clnow=GetZCardDataFromRedis('clnow');			
			dataModel.prototype.OrderStr=GetStringDataFromRedis('OrderStr');
			dataModel.prototype.memnow=GetZCardDataFromRedis('memnow');
			//TODO:转换和赋值
			dataModel.prototype.memberOnline=GetRedisJsonDataWithOnlinePerson(Get_ZrevRangeByScoreData("memnow",0,50));
		}
	});
}

function GetRedisTops(dic,arr)
{
	var okeys="";
	for(var key in dic)
	{
		okeys = "|" + info.Key + "|";
		if (okeys.indexOf("|1|2|3|")>=0)
		{
			arr[0] += Number(info.Value);
		}
		else if (okeys.indexOf("|19|20|")>=0)
		{
			arr[1] += Number(info.Value);
		}
		else if (okeys.indexOf("|4|5|6|7|8|13|15|23|")>=0)
		{
			arr[2] += Number(info.Value);
		}
		else if (okeys.indexOf("|12|14|21|22|")>=0)
		{
			arr[3] += Number(info.Value);
		}
		else if (okeys.indexOf("|15|16|")>=0)
		{
			arr[4] += Number(info.Value);
		}
		else if (okeys.indexOf("|24|25|26|27|28| ")>=0)
		{
			arr[5] += Number(info.Value);
		}
		else
		{
			arr[6] += Number(info.Value);
		}
	}
}

//自定义字典
function CustomDictionary(){
	 this.data = new Array();
	 var arraySize=0;
	 
	 this.put = function(key,value){
		this.data[key] = value;
		size++;
	 };

	 this.get = function(key){
	    return this.data[key];
	 };
	 
	 this.getArray=function(){
	    return this.data;
	 };
	 
	 this.getSize=function()
	 {
		return arraySize;
	 }
}

function GetStringDataFromRedis(key)
{
	client.get(key,function(error,data)
	{
		if(error)
		{
			console.log('获取'+key+"值出现异常:"+error);
		}
		else
		{
			return data;
		}
	});
}


function GetZCardDataFromRedis(key)
{
	client.zcard(key,function(error,data)
	{
		if(error)
		{
			console.log('获取'+key+"值出现异常:"+error);
		}
		else
		{
			return data;
		}
	});
}

function Get_ZrevRangeByScoreData(key,count,offset)
{	
	var args2 = [key, MAX, MIN, 'WITHSCORES', 'LIMIT', offset, count ];
	var customDictionary=new CustomDictionary();
	client.zrevrangebyscore(args2, function (err, res) {
		for(var i=1;i<res.length;i+=2)
		{
			customDictionary.put(res[i-1],res[i]);
		}	
	});
}

function GetRedisJsonDataWithOnlinePerson(dic)
{
	var JsonString="[";
	var memberName="";
	for(var key in dic)
	{
		memberName=	GetStringDataFromRedis("Cu_"+key);
		JsonString+="{ \"key\": \"" + memberName + "\", \"value\": \"" + dic[key] + "\"},";
	}
	JsonString=JsonString.substring(0,JsonString.length-1)+"]";
	return JsonString;
}

function GetRedisJsonDataWithPercent(dic)
{
	var JsonString="[";
	var total=CalculateTotalNumber(dic);
	for(var key in dic)
	{	
		JsonString+="{ \"key\": \"" + Key + "\", \"value\": \"" + dic[key].ToString("0") + "\", \"per\": \"" + (dic[key] * 100 / 			  total).ToString("0.00") + "\"},";
	}
	JsonString=JsonString.substring(0,JsonString.length-1)+"]";
	return JsonString;
}

function CalculateTotalNumber(dic)
{
	var total=0;
	for(var key in dic)
	{
		total+=Number(dic[key]);		
	}
	return total;
}

function GetNowFormatDate(){
    var Year = 0;
    var Month = 0;
    var Day = 0;
    var CurrentDate = "";
    Year= newDate.getFullYear();
    Month= newDate.getMonth()+1;
    Day = newDate.getDate();
    CurrentDate += Year;
    if (Month >= 10 ){
     CurrentDate += Month;
    }
    else{
     CurrentDate += "0" + Month;
    }
    if (Day >= 10 ){
     CurrentDate += Day ;
    }
    else{
     CurrentDate += "0" + Day ;
    }
    return CurrentDate;
 }

var dataModel=function BlackBoardData()
{
	
}
