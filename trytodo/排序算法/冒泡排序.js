function bubbleSort(arr){
    var low = 0;
    var high = arr.length-1;
    var temp;
    while(low<high){
        for(var j=low;j<high;j++){
            if(arr[j]>arr[j+1]){
                temp = arr[j];
                arr[j] = arr [j+1];
                arr[j+1] = temp;
            }
            --high;
        }
        for(var j=high;j>low;j--){
            if(arr[j]<arr[j-1]){
                temp = arr[j-1];
                arr[j-1]=arr[j];
                arr[j]=temp;
            }
        }
    }
        
}