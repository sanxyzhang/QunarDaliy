function isPrimeNum(num){
  for (var i = 2; i < num; i++) {
  if (num%i==0){
  return false;
  }
  };
  return true;
  }
function sumNum(n){
    var first=1;
    var sum=0;
    for(var i=1;i<n;i++){
      if(isPrimeNum(first)){
        sum+=first;
      }
      first=first+2;
    }
    return sum;
}

console.log(sumNum(4))