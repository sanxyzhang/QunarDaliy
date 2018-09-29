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