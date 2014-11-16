var str="王涵杨联系node.js";
var buf=new Buffer(str,'utf-8');
console.log(buf);
//<Buffer e7 8e 8b e6 b6 b5 e6 9d a8 e8 81 94 e7 b3 bb 6e 6f 64 65 2e 6a 73>

var buf=new Buffer(100);
console.log(buf.length);

console.log(buf[10]);

buf[20]=-100;
console.log(buf[20]);
buf[30]=300;
console.log(buf[30]);
buf[40]=3.1415;
console.log(buf[40]);
