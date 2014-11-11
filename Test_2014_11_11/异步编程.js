var foo=
{
	x:3
}

var bar=function()
{
	console.log(this.x);
}

bar();//undefined

var boundFunc=bar.bind(foo);

boundFunc();//3