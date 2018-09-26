function insertSort(arr){
    for(var i=1;i<arr.length;i++){
        var key=i;
        var j=i-1;
        while(j>=0&&arr[j]>arr[key]){
            arr[j+1]=arr[j];
            j--;
        }
        arr[j+1]=arr[key];
    }
    return arr;
}