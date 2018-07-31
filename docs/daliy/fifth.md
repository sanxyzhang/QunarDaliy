## FifthDay
### css文本过长，设置...省略样式
```javascript
.title{ width:300px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
```
clip：不显示省略标记（...），而是简单的裁切。
ellipsis：当对象内文本溢出时显示省略标记（...）
### react创建组建
##### 无状态函数式组件
它是为了创建纯展示组件，这种组件只负责根据传入的props来展示，不涉及到要state状态的操作。
```javascript
function HelloComponent(props, /* context */) {
  return <div>Hello {props.name}</div>
}
ReactDOM.render(<HelloComponent name="Sebastian" />, mountNode) 
```
无状态组件有以下几个显著的特点

1.组件不会被实例化，整体渲染性能得到提升

因为组件被精简成一个render方法的函数来实现的，由于是无状态组件，所以无状态组件就不会在有组件实例化的过程，无实例化过程也就不需要分配多余的内存，从而性能得到一定的提升。

2.组件不能访问this对象

无状态组件由于没有实例化过程，所以无法访问组件this中的对象，例如：this.ref、this.state等均不能访问。若想访问就不能使用这种形式来创建组件

3.组件无法访问生命周期的方法

因为无状态组件是不需要组件生命周期管理和状态管理，所以底层实现这种形式的组件时是不会实现组件的生命周期方法。所以无状态组件是不能参与组件的各个生命周期管理的。

.4无状态组件只能访问输入的props，同样的props会得到同样的渲染结果，不会有副作用
### 2.redux,react重写todolist
##### createAction
定义的两种写法
```javascript
export const addTodo = (text)=>({
    type:"ADD_TODO",
    text
});
//两种写法，别陌生
export function toggleTodo(index){
    return{
        type:"TOGGLE_TODO",
        index
    }
}
```
##### mapStateToProps,mapDispatchToProps
将从顶层注入，由父组件向下传递，改为按需注入，删除container
##### 深入理解connect方法，加深对redux纯函数的理解，

### 3.qxf事例代码研读