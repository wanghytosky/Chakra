var util=require('util');
function Base()
{
	this.name='base';
	this.base=1991;
	this.sayHello=function()
	{
		console.log('Hello'+this.name);
	};
}
Base.prototype.showName=function()
{
	console.log(this.name);
}
function Sub()
{
	this.name='sub';
}

util.inherits(Sub,Base);
var objBase=new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);
var objSub=new Sub();
objSub.showName();
console.log(objSub);
//发布订阅

var events=require('events');

var emitter=new events.EventEmitter();

emitter.on("event1",function(message)
{
	console.log(message);
});
emitter.emit('event1','i am message');