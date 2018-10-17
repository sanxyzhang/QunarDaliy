### 1.熟悉大龙票务系统代码结构，完成大龙票务系统汇总页的6个表单编写。
### 2.移动端输入框拉起键盘种类
```<input type="text" name="txtPassword" ng-trim="false" ng-model="pwdValue" ng-change="updatePassword();" ng-focus="onFocus();" ng-blur="onBlur()" autocomplete="off" autocorrect="off" maxlength="6">```

如果没有对input做特殊类型设置的话，一般都会根据用户的设置选择的语言来展示软键盘

```<input type="text" pattern="[0-9]*" name="txtPassword" ng-trim="false" ng-model="pwdValue" ng-change="updatePassword();" ng-focus="onFocus();" ng-blur="onBlur()" autocomplete="off" autocorrect="off" maxlength="6">```
* pattern="[0-9]*"
* type="number" 和type="password"均不如上个效果好
### 3.node.js事件驱动
* 使用回调函数进行异步操作
```javascript
const readFileArray=function(file,cb){
    fs.readFile(file,function(err,data){
        if(err){
            return cb(err);
        }
        const lines=data.toString().trim().split('\n');
        cb(null,lines);
    })
}
readFileAsArray('./number.txt',(err,lines)=>{
    if(err) throw err;
    const numbers=lines.map(Number);
    const oddNumbers= numbers.filter(n => n%2===1);
})
```
* 使用Promise进行改进
```javascript
readFileAsArray('./numbers.txt')
  .then(lines => {
    const numbers = lines.map(Number);
    const oddNumbers = numbers.filter(n => n % 2 === 1);
    console.log('Odd numbers count:', oddNumbers.length);
  })
  .catch(console.error);
```
```javascript
const readFileArray = function(file,cb=()=>{}){
    return new Promise((resolve,reject)=>{
        fs.readFile(file,function(err,data){
            if(err){
                reject(err);
            }
            const lines=data.toString().trim().split('\n');
            resolve(lines);
        })
    })
}
```
* Generator async/await进行改进
```javascript
async function countOdd() {
  try {
    const lines = await readFileAsArray('./numbers');
    const numbers = lines.map(Number);
    const oddCount = numbers.filter(n => n % 2 === 1).length;
    console.log('Odd numbers count:', oddCount);
  } catch (err) {
    console.error(err);
  }
}
countOdd();
```