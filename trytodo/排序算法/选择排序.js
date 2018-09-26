function selectSort(arr){
    for(var i=0;i<arr.length-1;i++){
        var minIndex=i;
        for(var j=i+1;j<arr.length;j++){
            if(arr[j]<arr[minIndex]){
                minIndex=j;
            }
        }
        var tmp=arr[minIndex];
        arr[minIndex]=arr[i];
        arr[i]=tmp;
    }
}