#### react重新渲染组件性能优化
1. 如若将组件的 prop 从 { x: 1 } 改为另外一个 { x: 1 }，React 将会重新渲染，因为这两个对象在内存上有不用的引用。
2. 样式不要写在组件中，函数在组件外边定义
3. 不能在组件外部定义时，将组件的方法作为事件处理传递过去。
4. 有很多独立的动态事件监听器
```javascript
class SomeComponent extends React.PureComponent {
  render() {
    return (
      <ul>
        {this.props.list.map(listItem =>
          <li key={listItem.text}>
            <Button onClick={() => alert(listItem.text)} />
          </li>
        )}
      </ul>
    );
  }
}
```
修改

```javascript
class SomeComponent extends React.PureComponent {

  // Each instance of SomeComponent has a cache of click handlers
  // that are unique to it.
  clickHandlers = {};

  // Generate and/or return a click handler,
  // given a unique identifier.
  getClickHandler(key) {

    // If no click handler exists for this unique identifier, create one.
    if (!Object.prototype.hasOwnProperty.call(this.clickHandlers, key)) {
      this.clickHandlers[key] = () => alert(key);
    }
    return this.clickHandlers[key];
  }

  render() {
    return (
      <ul>
        {this.props.list.map(listItem =>
          <li key={listItem.text}>
            <Button onClick={this.getClickHandler(listItem.text)} />
          </li>
        )}
      </ul>
    );
  }
}
```
### Event Loop事件循环
##### 一.js 异步执行的运行机制。

1. 所有任务都在主线程上执行，形成一个执行栈。
2. 主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
3. 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"。那些对应的异步任务，结束等待状态，进入执行栈并开始执行。
4. 主线程不断重复上面的第三步。

##### 异步任务分为 宏任务（macrotask） 与 微任务 (microtask)
1. 宏任务(macrotask)：：
script(整体代码)、setTimeout、setInterval、UI 渲染、 I/O、postMessage、 MessageChannel、setImmediate(Node.js 环境)
2. 微任务(microtask)：
Promise、 MutaionObserver、process.nextTick(Node.js环境

##### Event Loop(事件循环)中，每一次循环称为 tick, 每一次tick的任务如下：

1. 执行栈选择最先进入队列的宏任务(通常是script整体代码)，如果有则执行
2. 检查是否存在 Microtask，如果存在则不停的执行，直至清空 microtask 队列
3. 更新render(每一次事件循环，浏览器都可能会去更新渲染)
4. 重复以上步骤

```javascript
 setTimeout(function () {
        console.log(1);
    });
    new Promise(function(resolve,reject){
        console.log(2)
        resolve(3)
    }).then(function(val){
        console.log(val);
    })
    console.log(4);
```
1. 先执行script同步代码
   (先执行new Promise中的console.log(2),then后面的不执行属于微任务
   然后执行console.log(4))
2. 执行完script宏任务后，执行微任务，console.log(3)，没有其他微任务了。


3. 执行另一个宏任务，定时器，console.log(1)。

