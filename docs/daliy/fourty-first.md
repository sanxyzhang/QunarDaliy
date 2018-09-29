### 跟有个后端的qa小姐姐折腾半天，哎，我也不会布环境啊，慌得一批，因为不会布前端的环境，最后功能也没测，就检查了下我的代码，qa小姐姐直接就发了线上。这波操作很6.
### 明天联调辅营并提测。
### 深拷贝的最佳实现
```javascript
function deepClone(obj){
    var newobj = obj instanceof Array? []:{};
    if(typeof obj!== 'object'){
        return obj;
    }
    else{
        for(var i in obj){
            newObj[i] = typeof obj[i] === "object"?deepClone(obj[i]):obj[i];
        }
    }
    return newObj;
}

//Object.prototype.toString.call(obj)检验对象类型
function getType(obj){
    var map = {
        '[object Boolean]':'boolean',
        '[object Number]'   : 'number', 
        '[object String]'   : 'string', 
        '[object Function]' : 'function', 
        '[object Array]'    : 'array', 
        '[object Date]'     : 'date', 
        '[object RegExp]'   : 'regExp', 
        '[object Undefined]': 'undefined',
        '[object Null]'     : 'null', 
        '[object Object]'   : 'object'
    };
    if(obj instanceof Element){
        return 'element';
    }
    return map[Object.prototype.toString.call(obj)];
}

function deepClone(data){
    var type=getType(data);
    var obj;
    if(type=='array'){
        obj=[];
        for(var i=0,len=data.length;i<len;i++){
            obj.push(deepClone(data[i]));
        }
    }
    if(type=='object'){
        obj=={};
        for(var key in data){
            obj[key]=deepClone(data[key]);
        }
    }
    else{
        return data;
    }
    return obj;
}
```