function sum(n){
    if(n==1){
        return 2;
    }
    if(n==2){
        return 3;
    }
    else{
        return sum(n-1)+sum(n-2);
    }
}
console.log(sum(3))
var arr=[1,0,1,0];
var sum1=0;
var sum0=0;
for(var i=0;i<arr.length;i++){
    if(arr[i]==1){
        sum1++;
    }
    else{
        sum0++;
    }
}
if(sum0>=sum1){
    if(sum1==1){
        console.log("1");
    }
    else {console.log(sum(sum1))};
}
 if(sum0<sum1){
    if(sum1==1){
        console.log("1");
    }
    else{console.log(sum0)};
 }
// function whatNum(num){ 
//     var n=num;
//     var sum=0;
//     while(num>=1){
//         sum=sum+num%10;
//         console.log(sum);
//         num=(num-num%10)/10;
//         console.log(num)
//     }
//     console.log(sum);
//     if(n%sum==0){
//         console.log("Yes");
//     }
//     else{
//         console.log("No");
//     }
// }

// whatNum(32);

// // 7
// // 34
// // 66
// // 72
// // 6
// // 32
// // 33
// // 86