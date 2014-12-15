var redis=require('redis');
var client = redis.createClient('PORT','IP');
var client_0 = redis.createClient('PORT','IP');
var http=require('http');
var eventProxy = require('eventproxy');
var newDate=new Date();
var MAX = 10000000000, MIN = 0;
client.auth("password");
client_0.auth("password");
client.on('error',function(error)
{
	 console.log("出现异常:"+error);
	 client.quit();
});

client_0.on('error',function(error)
{
	 console.log("出现异常:"+error);
	 client_0.quit();
});
var mem_dic;
var arr_params;
var memberOnline_JsonString;
http.createServer(function(req,res)
{
	memberOnline_JsonString="";
	arr_params=new Array();
	console.log(arr_params);
	console.log(memberOnline_JsonString);
	 console.log('createServer Start!');
	 req.on('data',function(trunk)
	 {
			   
	 }).on('end',function()
	 {
	   var proxy = new eventProxy();
	   var bbData=new BlackBoardData();

	   proxy.assign("v1", "v2", "v3","v4","v5","v6","v7","v8","v9","v10","v11","v12","v13","v14","v15","v16","v17","v18","v19","v20","v21","v22","v23","v24","v25", function()
	   {
			var arr_length=0;
			for(var mem in mem_dic)
			{
				arr_length++;
			}                           

			for(var i=0;i<arr_length;i++)
			{
				arr_params[i]="fun"+(i+1);
			}
			var proxy_sub = new eventProxy();
			proxy_sub.assign(arr_params, function()
			{
				 arr_params=new Array();
				 memberOnline_JsonString="["+memberOnline_JsonString.substring(0,memberOnline_JsonString.length-1)+"]";
				 bbData.memberOnline=memberOnline_JsonString;      
				 //client.quit();
				 //client_0.quit();
				 res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'});
				 res.end("("+ParseObjectToJson(bbData)+")");
			});
			MemberOnLine(bbData,proxy_sub);                
	   });               
	   FillDataModel(bbData,proxy);                   
	 });     
}).listen(PORT,'IP');
console.log('start to listening');

function MemberOnLine(model,proxy)
{
	 if(mem_dic!=null)
	 {
	   var i=0;
	   for(var key in mem_dic)
	   {        
			client_0.get("Cu_"+key,function(error,data)
			{        
				 if(error)
				 {
				   console.log('获取'+key+"值出现异常:"+error);
				 }
				 else
				 {
				   memberOnline_JsonString+="{ \"key\": \"" + data + "\", \"value\": \"" + mem_dic[key] + "\"},";
				 }
				 proxy.trigger(arr_params[i], data);
				 i++;
			});
	   }
	   //memberOnline_JsonString="["+memberOnline_JsonString.substring(0,memberOnline_JsonString.length-1)+"]";
	   //model.memberOnline=memberOnline_JsonString;     
	 }
	 else
	 {
		   //client.quit();
		   //client_0.quit();
		   res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'});
		   res.end();
	 }
}

function ParseObjectToJson(model)
{
	 return JSON.stringify(model);
}

function BlackBoardData()
{
	 this.Mip="";
	 this.Mpv="";
	 this.Muv="";
	 this.OrderCountALL="";
	 this.OrderCountPaid="";
	 this.OrderCountAoyou="";
	 this.OrderCountAoyouPaid="";
	 this.OrderMoney="";
	 this.OrderMoneyAoyou="";
	 this.GuestNum="";
	 this.GuestNumAoyou="";
	 this.MemberCount="";
	 this.MemberCountAoyou="";
	 this.OnlinePayRecordCount="";
	 this.OnlinePayOrderCount="";
	 this.OnlinePayMoney="";                           
	 this.botname="";
	 this.rdomain="";      
	 this.moduleid1="";
	 this.moduleid2="";
	 this.moduleid3="";
	 this.moduleid4="";
	 this.moduleid5="";
	 this.moduleid6="";
	 this.moduleid7="";
	 //DB0
	 this.d11_tel="";
	 this.d11_Activity="";
	 this.clnow="";
	 this.OrderStr="";
	 this.memnow="";
	 //TODO:转换和赋值
	 this.memberOnline="";
}

function FillDataModel(model,proxy)
{
         var arr=[0,0,0,0,0,0,0];
         var date_Str=GetNowFormatDate();
         client.select('1', function(error)       
         {
                   if(error) 
                   {
							
                            console.log(error);
                   } 
                   else 
                   {
                            client.get(date_Str+'Mip',function(error,data)
                            {
                                     model.Mip=data;
                                     proxy.trigger("v1", data);
                            });
                            client.get(date_Str+'Mpv',function(error,data)
                            {
                                     model.Mpv=data;
                                     proxy.trigger("v2", data);
                            });
                            client.get(date_Str+'Muv',function(error,data)
                            {
                                     model.Muv=data;
                                     proxy.trigger("v3", data);
                            });
                            client.get('WebSta_OrderCountALL',function(error,data)
                            {
                                     model.OrderCountALL=data;
                                     proxy.trigger("v4", data);
                            });
                            client.get('WebSta_OrderCountPaid',function(error,data)
                            {
                                     model.OrderCountPaid=data;
                                      proxy.trigger("v5", data);
                            });
                            client.get('WebSta_OrderCountAoyou',function(error,data)
                            {
                                     model.OrderCountAoyou=data;
                                     proxy.trigger("v6", data);
                            });
                            client.get('WebSta_OrderMoney',function(error,data)
                            {
                                     model.OrderMoney=data;
                                     proxy.trigger("v7", data);
                            });
                            client.get('WebSta_OrderMoneyAoyou',function(error,data)
                            {
                                     model.OrderMoneyAoyou=data;
                                     proxy.trigger("v8", data);
                            });
                            client.get('WebSta_GuestNum',function(error,data)
                            {
                                     model.GuestNum=data;
                                     proxy.trigger("v9", data);
                            });
                            client.get('WebSta_GuestNumAoyou',function(error,data)
                            {
                                     model.GuestNumAoyou=data;
                                     proxy.trigger("v10", data);
                            });
                            client.get('WebSta_MemberCount',function(error,data)
                            {
                                     model.MemberCount=data;
                                     proxy.trigger("v11", data);
                            });
                            client.get('WebSta_MemberCountAoyou',function(error,data)
                            {
                                     model.MemberCountAoyou=data;
                                     proxy.trigger("v12", data);
                            });
                            client.get('WebSta_OnlinePayRecordCount',function(error,data)
                            {
                                     model.OnlinePayRecordCount=data;
                                     proxy.trigger("v13", data);
                            });
                            client.get('WebSta_OnlinePayOrderCount',function(error,data)
                            {
                                     model.OnlinePayOrderCount=data;
                                     proxy.trigger("v14", data);
                            });
                            client.get('WebSta_OnlinePayMoney',function(error,data)
                            {
                                     model.OnlinePayMoney=data;
                                     proxy.trigger("v15", data);
                            });
                            client.get('WebSta_OrderCountAoyouPaid',function(error,data)
                            {
                                     model.OrderCountAoyouPaid=data;
                                     proxy.trigger("v16", data);
                            });
                            
                            client.zrevrangebyscore([date_Str+'botname', MAX, MIN, 'WITHSCORES', 'LIMIT', 0, 10 ], function (err, res) {                             
                                     var customDictionary=new CustomDictionary();
                                     for(var i=1;i<res.length;i+=2)
                                     {                                    
                                               customDictionary.put(res[i-1],res[i]);
                                     }                 
                                     var dicArr=customDictionary.getArray();
                                     var JsonString="[";
                                     var total=CalculateTotalNumber(dicArr);

                                     for(var key in customDictionary.getArray())
                                     {        
                                               JsonString+="{ \"key\": \""+key+"\", \"value\": \"" + dicArr[key] + "\", \"per\": \"" + (dicArr[key] * 100 /total) + "\"},";
                                     }
                                     model.botname=JsonString.substring(0,JsonString.length-1)+"]";
                                     proxy.trigger("v17", res);                  
                            });
                            
                            
                            client.zrevrangebyscore([date_Str+'rdomain', MAX, MIN, 'WITHSCORES', 'LIMIT', 0, 10 ], function (err, res) {                               
                                     var customDictionary=new CustomDictionary();
                                     for(var i=1;i<res.length;i+=2)
                                     {                                    
                                               customDictionary.put(res[i-1],res[i]);
                                     }                 
                                     var dicArr=customDictionary.getArray();
                                     var JsonString="[";
                                     var total=CalculateTotalNumber(dicArr);

                                     for(var key in customDictionary.getArray())
                                     {        
                                               JsonString+="{ \"key\": \""+key+"\", \"value\": \"" + dicArr[key] + "\", \"per\": \"" + (dicArr[key] * 100 /total) + "\"},";
                                     }
                                     model.rdomain=JsonString.substring(0,JsonString.length-1)+"]";
                                     proxy.trigger("v18", res);                  
                            });
                            
                            //TODO:赋值
                            client.zrevrangebyscore([date_Str+'moduleid', MAX, MIN, 'WITHSCORES', 'LIMIT', 0, 50 ], function (err, res) { 
                                     var customDictionary=new CustomDictionary();
                                     for(var i=1;i<res.length;i+=2)
                                     {                                    
                                               customDictionary.put(res[i-1],res[i]);
                                     }                 

                                     var dicArr=customDictionary.getArray();
                                     GetRedisTops(dicArr,arr);
                                     model.moduleid1=arr[1];
                                     model.moduleid2=arr[1];
                                     model.moduleid3=arr[2];
                                     model.moduleid4=arr[3];
                                     model.moduleid5=arr[4];
                                     model.moduleid6=arr[5];
                                     model.moduleid7=arr[6];         
                                     proxy.trigger("v19", res);                  
                            });
                   }
         });
         
         client_0.select('0', function(error)  
         {
                   if(error) 
                   {
                            console.log(error);
                   } 
                   else 
                   {
                            client_0.get('d11_tel',function(error,data)
                            {
                                     model.d11_tel=data;
                                     proxy.trigger("v20", data);
                            });

                            client_0.get('d11_tel',function(error,data)
                            {
                                     model.d11_Activity=data;
                                     proxy.trigger("v21", data);
                            });
                            
                            client_0.get('OrderStr',function(error,data)
                            {
                                     model.OrderStr=data;
                                     proxy.trigger("v22", data);
                            });
                            
                            client_0.zcard('clnow',function(error,data)
                            {
                                     if(error)
                                     {
                                               console.log('获取'+key+"值出现异常:"+error);
                                     }
                                     else
                                     {
                                               model.clnow=data;
                                               proxy.trigger("v23", data);
                                     }
                            });
                            
                            client_0.zcard('memnow',function(error,data)
                            {
                                     if(error)
                                     {
                                               console.log('获取'+key+"值出现异常:"+error);
                                     }
                                     else
                                     {
                                               model.memnow=data;
                                     }
                                     proxy.trigger("v24", data);
                            });
                            
                            client_0.zrevrangebyscore(['memnow', MAX, MIN, 'WITHSCORES', 'LIMIT', 0, 50 ], function (err, data) 
                            {                                    
                   
                                     var customdic=new CustomDictionary();
                                     for(var i=1;i<=data.length;i+=2)
                                     {                           
                                               customdic.put(data[i-1],data[i]);
                                     }                 
                                     mem_dic=customdic.getArray();
                                     proxy.trigger("v25", data);
                            });               
                   }
         });
         
}

function GetRedisTops(dic,arr)
{
         var okeys="";
         for(var info in dic)
         {
                   okeys = "|" + info + "|";
                   if ("|1|2|3|".indexOf(okeys)>=0)
                   {
                            arr[0] += Number(dic[info]);
                   }
                   else if ("|19|20|".indexOf(okeys)>=0)
                   {
                            arr[1] += Number(dic[info]);
                   }
                   else if ("|4|5|6|7|8|13|15|23|".indexOf(okeys)>=0)
                   {
                            arr[2] += Number(dic[info]);
                   }
                   else if ("|12|14|21|22|".indexOf(okeys)>=0)
                   {
                            arr[3] += Number(dic[info]);
                   }
                   else if ("|15|16|".indexOf(okeys)>=0)
                   {
                            arr[4] += Number(dic[info]);
                   }
                   else if ("|24|25|26|27|28| ".indexOf(okeys)>=0)
                   {
                            arr[5] += Number(dic[info]);
                   }
                   else
                   {
                            arr[6] += Number(dic[info]);
                   }
         }
}

//自定义字典
function CustomDictionary(){
         this.data = new Array();
         var arraySize=0;
         
          this.put = function(key,value){
                   this.data[key] = value;
                   arraySize++;
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

function Get_ZrevRangeByScoreData(key,count,offset,proxy,vNum)
{        
         var args2 = [key, MAX, MIN, 'WITHSCORES', 'LIMIT', offset, count ];
         var customDictionary=new CustomDictionary();
         client.zrevrangebyscore(args2, function (err, res) {
                   for(var i=1;i<res.length;i+=2)
                   {
                            customDictionary.put(res[i-1],res[i]);
                   }
                   proxy.trigger("v"+vNum, data);
         });
         return customDictionary;
}

function GetRedisJsonDataWithOnlinePerson(dic,proxy)
{
         var JsonString="";
         var memberName="";
         var i=0;
         for(var key in dic)
         {
                   i++;
                   client.get("Cu_"+key,function(error,data)
                   {
                            if(i==dic.getSize())
                            {
                                     proxy.trigger("v26", data);
                            }
                            
                            if(error)
                            {
                                     console.log('获取'+key+"值出现异常:"+error);
                            }
                            else
                            {
                                     return data;
                            }
                   });
                   JsonString+="{ \"key\": \"" + memberName + "\", \"value\": \"" + dic[key] + "\"},";
         }
         JsonString="["+JsonString.substring(0,JsonString.length-1)+"]";
         return JsonString;
}

function GetRedisJsonDataWithPercent(dic,proxy)
{
         var JsonString="[";
         var total=CalculateTotalNumber(dic);
         for(var key in dic)
         {        
                   JsonString+="{ \"key\": \"" + Key + "\", \"value\": \"" + dic[key].ToString("0") + "\", \"per\": \"" + (dic[key] * 100 /                        total).ToString("0.00") + "\"},";
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
