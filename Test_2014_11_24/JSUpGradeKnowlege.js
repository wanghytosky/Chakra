//1.js不支持函数的重载
//2.js中一个方法是一个对象
//3.方法定义的内部机制是new //Function实现的,一个方法就是Function类的一个实例对象。
//两种模式：
//第一种
function add(number)
{
	alert(number);
}
//第二种
var add_2=new Function("number","alert(number);");
//4.每个方法即对象都有内置的arguments对象和length属性
//arguments对象为数组类型，由调用方法时实际传递的参数组成，可以通过argments.le//ngth来获得实际传递的参数个数，也可以通过arguments[0]、argument[1]等获得实/////际传递的各个参数的值
//length属性为方法所期望的参数的个数
function add3(number)
{
	alert("参数个数为:"+arguments.length);
}
add3(1,2,3);

//5.js中有5种数据类型(原数据):Undefined、Null、Boolean、Number、String
//Undefined数据类型只有一个：Undefined
//Null数据类型值只有一个：null
//Boolean
//Number
//String
//undefined是由null派生而来的
//6.typeof五种结果：undefined、boolean、number、string、object
//前面4个是原始类型的值，最后一个是对象
//7.对于函数来说，如果没有返回值那么返回值就是undefined
//8.对于函数定义中地变量来说，加var 标识局部变量，不加就是全局变量
function GlobalArgument()
{
	a=1;
	alert("此处有全局变量a："+a);
}
alert("全局变量a值:"+a);
























