var redis=require('redis');
var client=redis.createClient('Port','IP');
var http=require('http');
client.auth("password");
client.on('error',function(error)
{
     console.log(error);
     console.log('wrong');
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
          client.select('1', function(error){
               if(error)
               {
                    console.log('inner wrong');
                    console.log(error);
               }
               else
               {
                    // get
                    client.get('Mip', function(error, res)
                    {
                         console.log(res);
                         if(error)
                         {
                              console.log('direct wrong');
                              console.log(error);
                         }
                         else
                         {
                              console.log(res);
                         }
                         // 关闭链接
                         client.end();
                         //res.writeHead(200,{'Content-Type':'text/plain'});
                         //res.end(res.toString());
                    });
               }
          });
     });    
}).listen(8887,'127.0.0.1');
console.log('start to listening');

var redis=require('redis');


     }).on('end',function()
     {
          console.log('createServer End!');
          client.select('1', function(error){
               if(error)
               {
                    console.log('inner wrong');
                    console.log(error);
               }
               else
               {
                    // get
                    client.get('Mip', function(error, res)
                    {
                         console.log(res);
                         if(error)
                         {
                              console.log('direct wrong');
                              console.log(error);
                         }
                         else
                         {
                              console.log(res);
                         }
                         // 关闭链接
                         client.end();
                         //res.writeHead(200,{'Content-Type':'text/plain'});
                         //res.end(res.toString());
                    });
               }
          });
     });    
}).listen(8887,'127.0.0.1');
console.log('start to listening');


