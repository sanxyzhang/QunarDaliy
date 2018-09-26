Array.prototype.distinct = function(){
    var arr=this,
    obj={},
    newarr = [];
    for(var i=0;i<arr.length;i++){
        if(!obj[arr[i]]){
            obj[i]=1;
            newarr.push(arr[i]);
        }
    }
    console.log(obj);
    return newarr;
}
var a = [1,2,3,4,5,6,5,3,2,4,56,4,1,2,1,1,1,1,1,1,];
var b = a.distinct();
console.log(b.toString()); 