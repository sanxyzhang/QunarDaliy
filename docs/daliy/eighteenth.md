### EighteenthDay
#### 1.接着边学边做质检申诉提交页面
哎，做了半天感觉最熟悉的就是栅栏布局了，什么响应式栅栏啊，push,pull啊

** Flex布局的应用 **
```html
<Row type="flex" justify="start" align="top">
      <Col order={4} span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
</Row>
```
1. 子元素根据不同的值 start,center,end,space-between,space-around，分别定义其在父节点里面的排版方式。
2. Flex 子元素垂直对齐。 align="top",middle,bottom
3. 通过 Flex 布局的 Order 来改变元素的排序。 order={4}

###### 2.又看了级联选择，表单的各种验证，info，error巴拉巴拉，感觉官方文档记得挺全的，都是api，没什么原理性的知识需要特别记忆，就这样吧。多用用就好了。

#### 3.react父子组件通信
1. 父组件 ＝> 子组件
这个最常见，父组件通过 props 向子组件传递需要的信息。因为 React 的通信方式是单向的，故此方法只适用于父组件 => 子组件
2. 子组件 ＝> 父组件
就是利用父组件向子组件通信时 props 可以传任何类型，包括函数的特性，然后使用回调把值传给父组件。

```javascript

import React,{ Component } from 'react'
class Father extends Component {
    constructor (props){
        super(props)
        this.state = {
            data: 'wait child to father'
        }
    }
    fatherHandleClick(data){
        this.setState({
            data
        })
    }
    render (){  
        return <div>
            <Child fatherHandleClick={ this.fatherHandleClick.bind(this) } />
            <h1>{this.state.data}</h1>
        </div>
    }
}
class Child extends Component {
    static defaultProps = {
        fatherHandleClick:()=>{}
    }
    static propTypes = {
        fatherHandleClick: PropTypes.func
    }
    render (){
        const {props} = this
        return <div onClick={ ()=>{
            this.props.fatherHandleClick('child to father')
        } }>
            <h1>This is Child.</h1>
        </div>
    }
}

```
