post请求带有 报头和内容
判断请求是否有内容：
var hasBody=function(req)
{
     return ’transfer-encoding’ in req.headers || ‘content-length’ in req.headers;
};
流的方式处理内容：
function(req,res)
{
     if(hasBody(req))
     {
          var buffers=[];
          req.on(‘data’,function(chunk){ buffers.push(chunk) });
          
          req.on(‘end’,function()
          {
               req.rawBody=Buffer.concat(buffers).toString();
               handle(req,res);
          });
     }else
     {
          handle(req,res);
      }
}
将接收到的buffer列表转换为一个buffer对象后，再转换没有乱码的字符串，暂时搁置在req.rawBody.
表单数据：
var handle=function(req,res)
{
     if(req.headers[‘content-type’]===‘application/x-www-form-urlencoded')
     {
          req.body=querystring.parse(req.rawBody);
     }
     todo(req,res);
}
其它格式：
json和xml
json：
var mime=function(req)
{
     var str=req.headers[‘content-type’]||’';
     return str.split(‘,’)[0];
};

var handle=function(req,res)
{
     if(mime(req)===‘application/json')
     {
          try
          {
               req..body=JSON.parse(req.rawBody);     
          }
          catch(e)
          {
               res.writeHead(400);
               res.end(‘Invalid JSON’);
               return;
          }
     }
     todo(req,res);
}
