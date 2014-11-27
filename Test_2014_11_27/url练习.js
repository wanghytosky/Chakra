var url=require('url');
var querystring=require('querystring');
var http=require('http');
http.createServer(function(request,response){  
        var pathname = url.parse(request.url).pathname;  //pathname => select  
          
        var arg = url.parse(request.url).query;          //arg => name=a&id=5  
        console.log("Request for " + arg );  
        var str = querystring.parse(arg);                //str=> {name:'a',id:'5'}  
          
        var arg1 = url.parse(request.url, true).query;   //arg1 => {name:'a',id:'5'}  
        console.log("Request for " + arg1 );  
          
        var name = querystring.parse(arg).name;         //name => a  
        console.log("name = "+name);  
  
        console.log("Request for " + pathname + " received.");  
    }).listen(8888);
