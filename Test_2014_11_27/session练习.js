var session={};
var key=“session_id”;
var EXPIRES=20*60*1000;//20分钟

//生成session存储到sessions中 
var generate=function()
{                                                             
     var session={};
     session.id=(new Date()).getTime()+Math.random();//键值:用当前时间和一个随机数能确定唯一性
     session.cookie=
     {
          expire:(new Date()).getTime()+EXPIRE;
     };
     sessions[session.id]=session;
     return session;
}

var serialize=function(name,val,opt)
{
     var pairs=[name+’=‘+encode(val)];
     opt=opt||{};
     if(opt.maxAge)pairs.push(‘Max-Age=‘+opt.maxAge);
     ...
     return pairs.join(‘; ‘);
}

var handle=function(req,res)
{
      res.writeHead(200);
      if(!req.cookies.isVisit)
     {
          res.writeHead(200);
          res.end(‘欢迎第一次来');
     }else
     {
          //TODO
     }
}

function(req,res)
{
     var id=req.cookie[key];
     if(!id)
     {
          req.session=generate();
     }
     else
     {
          var session=sessions[id];
          if(session)
          {
               if(session.cookie.expire>(new Date()).getTime())
               {
                    session.cookie.expire=(new Date()).getTime()+EXPIRES;
                    req.session=session;
               }else
               {
                    delete session[id];
                    req.session=generate();         
               }
          }else
          {
               req.session=generate();
          }    
     }
     handle(req,res);
}

var writeHead=res.writeHead;
res.writeHead=function()
{
     var cookies=res.getHeader(’Set-Cookie’);
     var session=serialize(key,req.session.id);
     cookies=Array.isArray(cookie)?cookies.concat(session):[cookies,session];
     res.setHeader(’Set-Cookie’,cookies);
     return writeHead.Apply(this,arguments);
}
