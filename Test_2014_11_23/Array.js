var arr=[];
arr[0]="aoyou";
arr[1]=1;
arr[2]=false;
console.log(arr);

var arr2=["www.baidu.com","123",1];
console.log(arr2);

var arr3=new Array();
arr3[0]="www.aoyou.com";
arr3[1]="wanghy";
arr3[2]=1;
arr3[3]=true;
console.log(arr3);

var arr4=new Array();
arr4.push(1);
arr4.push("www.aoyou.com");
console.log(arr3);

var arr5=new Array();
arr5.unshift("1");
arr5.unshift("2");
arr5.unshift("3");
console.log(arr5);

arr5.pop();//3 2
console.log(arr5);

arr5.shift();//2
console.log(arr5);

arr4.splice(1,1);
console.log(arr4);