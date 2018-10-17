### 1.联调完辅营退票，待提测状态。
### 2.react高阶组件和装饰者模式
我们可以对传入的原始组件 WrappedComponent 做一些你想要的操作（比如操作 props，提取 state，给原始组件包裹其他元素等），从而加工出你想要的组件 EnhancedComponent 。把通用的逻辑放在高阶组件中，对组件实现一致的处理，从而实现代码的复用。
* 实现一个表单元素的高阶组件

```javascript
//高阶组件 InputHOC.js  
import React,{ Component } from 'react';

export default (WarppedComponent)=>{
    return class InputHOC extends Component{
        constructor(props){
            super(props);
            this.state={
                value:""
            }
        }
        handleChange= (e)=>{
            this.setState({
                value:e.target.value
            })
        }
        render(){
            const passProps = {
                value:this.state.value,
                onChange:this.handleChange
            }
            return (<WarppedComponent {...passProps}/>)
           
        }
    }
}
```

```javascript 
//调用高阶组件 Input.js
import React,{Component} from 'react';
import InputHOC from './InputHOC';

class Input extends Component {
    render(){
        return (
            <input className="input" type="text" {...this.props}/>
        )
    }
}
export default InputHOC(Input);
```