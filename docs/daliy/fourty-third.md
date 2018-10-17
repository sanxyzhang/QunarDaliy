### 1.promise封装ajax请求
```javascript
function getJson(url,method){
    return new Promise(resolve,reject){
        var xhr = new XMLHttpRequest();
        xhr.open(method,url,true);
        xhr.onreadystatechange(){
            if(xhr.readyState=="4"){
                if(xhr.status="200"||"304"||"206"){
                    resolve(this.responseText,this);
                }
                else{
                    var rejectReason={code:this.status,response:this.response};
                    reject(rejectReason,this);
                }
            }
        }
        xhr.send();
    }
}
``` 
### 2.js高级程序设计——json
1. json序列化对象属性时，忽略undefined
2. JSON.stringify(),JSON.parse();
3. 序列化选项
```javascript
var person = {
    "name":["sanxy","zhangyue"],
    "age":11,
    "height":187,
    "weight":undefined
}
//过滤结果
//第二个参数是数组
var jsonText=JSON.stringify(person,["name","age","weight"]);
//=>"{"name":"sanxy","age":11}"
//第二个参数是函数
var jsonText = JSON.Stringify(person,function(key,value){
    switch(key){
        case "name":
            return value.join("|");
        case "age":
            return 21;
        default :
            return value;
    }
})
//=>"{"name":"sanxy|zhangyue","age":21,"height":187}"
```

4. parse解析选项
```javascript
//再将日期字符串转化为Date对象时，经常要用到还原函数
var person={
    "birth":new Date(1997,5,9),
    "age":21
}
var jsonText = JSON.stringify(person);
var personCopy = JSON.parse(jsonText,function(key,value){
    if(key=="birth"){
        return new Date(value);
    }
    else{
        return value;
    }
})
```


