//nextTick执行的优先级高于setImmediate
setImmediate(function()
{	
	console.log("setImmediate");
});
process.nextTick(function()
{
	console.log("nextTick");
});

console.log("normal");





