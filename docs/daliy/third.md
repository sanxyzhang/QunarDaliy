## Third Day
### 1.使用节流函数对滚动操作的优化，详细步骤补在second day上；
### 2.熟悉YIcon图标字体库的使用
### 3.redux文档的学习
#### 动机：Redux 试图让 state 的变化变得可预测。
#### Redux的三大原则
##### (1).单一数据源
整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。
** Store 有以下职责：**
* 维持应用的 state；
* 提供 getState() 方法获取 state；
* 提供 dispatch(action) 方法更新 state；
* 通过 subscribe(listener) 注册监听器;
##### (2).State 是只读的
唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。
##### (3).使用纯函数来执行修改
为了描述 action 如何改变 state tree ，你需要编写 reducers
######.reducer 一定要保持纯净。
* 只要传入参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。
* 不要在原对象上进行修改
#### Redux数据流
##### 严格的单向数据流是 Redux 架构的设计核心。
#### Redux 原生提供combineReducers()辅助函数，来把根 reducer 拆分成多个函数，用于分别处理 state 树的一个分支。
```javascript
function todos(state = [], action) {
   // 省略处理逻辑...
   return nextState
 }

 function visibleTodoFilter(state = 'SHOW_ALL', action) {
   // 省略处理逻辑...
   return nextState
 }

 let todoApp = combineReducers({
   todos,
   visibleTodoFilter
 })
```
#### React的refs绑定函数和绑定字符串，推荐使用绑定函数


```javascript
import React from 'react';
 
class AddTodo extends React.Component {
    render() {
        let input;
        return (
            <form onSubmit = {
                (e) => {
                    if (input.value.trim() === '') {
                        return;
                    }
                    e.preventDefault();
                    this.props.onAddClick(input.value);
                    input.value = '';
                }
            }>
                <input type="text" required ref = {node => {
                    input = node;
                }} />
                <input type="submit" value="add" />
            </form>
        );
    }
}
 
export default AddTodo;
```