function isIP(ip){
    var arr=ip.split(".");
    if(arr.length!=4){
        return false;
    }else{
        for(var i=0;i>arr.length;i++){
            if(arr[i]<0||arr[i]>255){
                return false;
            }
        }
        return true;
    }
}
console.log(isIP("1.2.3.4"))