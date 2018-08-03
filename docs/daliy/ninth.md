## NinthDay
### 1.熟练掌握Charles基础操作
##### 1.过滤网络请求
在 Charles 的菜单栏选择 “Proxy”->”Recording Settings”，然后选择 Include 栏，选择添加一个项目，然后填入需要监控的协议，主机地址，端口号。这样就可以只截取目标网站的封包了。

##### 2.抓取pc端和移动端的https请求
只需要安装相对应的协议即可，移动端需按照charles所在pc机ip地址设置http代理

#### 3.Map功能
Map Remote 是将指定的网络请求重定向到另一个网址请求地址，Map Local 是将指定的网络请求重定向到本地文件。
Map Local则可以mock本地json数据，实用于api借口调试

#### 4.模拟慢速网络
在做移动开发的时候，我们常常需要模拟慢速网络或者高延迟的网络，以测试在移动网络下，应用的表现是否正常。Charles 对此需求提供了很好的支持。

路径：tools —— map remote —— 勾选enable  map remote —— add  —— map  from输入线上服的地址 —— map  to 输入 测试的地址 —— 点击ok

### 2.研读es6：promise
##### 定义：
Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。

Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject

##### .then方法
then方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为resolved时调用，第二个回调函数是Promise对象的状态变为rejected时调用。其中，第二个函数是可选的，不一定要提供。

用Promise对象实现的 Ajax 操作的例子
```javascript
const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject){
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

  });

  return promise;
};

getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
```
 .then方法接受resolve(this.response)中 的response作为参数

###### catch方法
Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。

如果 Promise 状态已经变成resolved，再抛出错误是无效的。
```javascript
const promise = new Promise(function(resolve, reject) {
  resolve('ok');
  throw new Error('test');
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
```
Promise 在resolve语句后面，再抛出错误，不会被捕获，等于没有抛出。因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了.

Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。

一般来说，不要在then方法里面定义 Reject 状态的回调函数（即then的第二个参数），总是使用catch方法。理由是第二种写法可以捕获前面then方法执行中的错误，也更接近同步的写法（try/catch）。

promise内部有语法错误。浏览器运行到这一行，会打印出错误提示，但是不会退出进程、终止脚本执行

###### Promise.all()
```const p = Promise.all([p1, p2, p3]);```
p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled
只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected
Promise.all方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例
```javascript
// 生成一个Promise对象的数组
const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
  return getJSON('/post/' + id + ".json");
});

Promise.all(promises).then(function (posts) {
}).catch(function(reason){

})
```
###### Promise.race()
```const p = Promise.race([p1, p2, p3]);```
只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。

###### Promise.resolve()
将现有对象转为 Promise 对象
```javascript
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```
Promise.resolve方法的参数分成四种情况。
1.参数是一个 Promise 实例,那么Promise.resolve将不做任何修改

2.参数是一个thenable对象,将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。

3.如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved

4.Promise.resolve方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。