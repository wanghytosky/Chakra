function executeFunc(count,sum){
  if(count == sum){
     return ; 
   }
   else{
    funcs[count](){
       count++;
       executeFunc(funcs,count,sum);
    });
   }  
}

function func1()
{
	console.log(1);
}

function func2()
{
	console.log(2222);
}

function func3()
{
	console.log(33333333);
}

//同步调用
var funcs = [func1,func2,func3];
var len = funcs.length;
executeFunc(0,len);