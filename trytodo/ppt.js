//object 返回error
function fn1(){
    try {
        Object.defineProperty(a, b, c);
    }catch (e) {
        console.log(e);
    }
  }
//reflect 不返回error
function fn2(){
    try {
        Reflect.defineProperty(a, b, c);
    }catch (e) {
    console.log(e);
    }
}
// Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，
// 而Reflect.defineProperty(obj, name, desc)则会返回fals
function fn3(){
    if(Reflect.defineProperty(a, b, c)){
        //success
    }
    else{
        console.log("f返回为true/false")
    }
}

//老写法
'assign' in Object // true

// 新写法
Reflect.has(Object, 'assign') // true

//如果name属性部署了读取函数（getter），则读取函数的this绑定receiver。
var myObject = {
    foo: 1,
    bar: 2,
    get baz() {
      return this.foo + this.bar;
    },
  };
  
  var myReceiverObject = {
    foo: 4,
    bar: 4,
  };
  
  Reflect.get(myObject, 'baz', myReceiverObject) 