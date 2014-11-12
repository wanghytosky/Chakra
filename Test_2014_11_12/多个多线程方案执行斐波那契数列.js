//���node��������cpu�ܼ�����������ַ���

//������TAGG����
function fibo(n)
{
	return n>1?fibo(n-1)-f(n-2):1;
}
var n=8;
function back()
{
	if(!--n)return console.timeEnd('no thread');
}
console.time('no thread');
process.nextTick(function()
{
	console.log(fibo(40));
	back();
});

process.nextTick(function()
{
	console.log(fibo(40));
	back();
});

process.nextTick(function()
{
	console.log(fibo(40));
	back();
});

process.nextTick(function()
{
	console.log(fibo(40));
	back();
});

process.nextTick(function()
{
	console.log(fibo(40));
	back();
});

process.nextTick(function()
{
	console.log(fibo(40));
	back();
});

process.nextTick(function()
{
	console.log(fibo(40));
	back();
});

process.nextTick(function()
{
	console.log(fibo(40));
	back();
});

//ʹ��TAGGģ�����8��
function fibo(n)
{
	return n>1?fibo(n-1)+fibo(n-2):1;
}
console.time('TAGG���� 8 times');
var numThreads=8;
var threadPool=require('threads_a_gogo').createPool(numThreads).all.eval(fibo)
var i=8;
var cb=function(err,data)
{
	console.log(data);
	if(!--i)
	{
		threadPool.destroy();
		console.timeEnd('TAGG���� 8 times End');
	}
}

threadPool.any.eval('fibo(40)',cb);
threadPool.any.eval('fibo(40)',cb);
threadPool.any.eval('fibo(40)',cb);
threadPool.any.eval('fibo(40)',cb);
threadPool.any.eval('fibo(40)',cb);
threadPool.any.eval('fibo(40)',cb);
threadPool.any.eval('fibo(40)',cb);
threadPool.any.eval('fibo(40)',cb);

//��clusterģ�����8��
var cluster=require('cluster');
var numCPUs=8;
function fibo(n)
{
	return n>1?fibo(n-1)+fibo(n-2):1;
}
console.time('cluster 8 times');
if(cluster.isMaster)
{
	//Fork workers
	for(var i=0;i<numCPUs;i++)
	{
		cluster.fork();
	}
	
	var i=8;
	cluster.on('exit',function(worker,code,signal)
	{
		if(!--i)
		{
			console.timeEnd('cluster 8 times');
			process.exit(0);
		}
	});
}
else
{
	console.log(fibo(40));
	process.exit(0);
}




















