
function(req,res)
{
     var pathname=url.parse(req.url).pathname;
     var paths=pathname.split(‘/‘);
     var controller=path[1]||’index’;
     var action=paths[2]||’index’;
     var args=paths.slice(3);
     if(handles[controller]&&handles[controller][action])
     {
          handles[controller][action].apply(null,[req,res].concat(args));
     }
     else
     {
          res.writeHead(500);
          res.end();
     }
}

handles.index={};
handles.index.index=function()
{
     res.writeHead(200);
     res.end(foo);
}
