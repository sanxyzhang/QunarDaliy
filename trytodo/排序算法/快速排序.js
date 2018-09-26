function quickSort(arr){
    if(arr.length==1){
        return arr;
    }
    else{
        var centerIndex=Math.floor(arr.length/2);
        var center=arr.splice(centerIndex,1)[0];
        var left=[];
        var right=[];
        for(var i=0;i<arr.length;i++){
            if(arr[i]>center){
                right.push(arr[i]);
            }
            else{
                left.push(arr[i]);
            }
        }
        return quickSort(left).concat([center],quickSort(right));
    }
}