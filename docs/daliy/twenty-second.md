##### 1.深入jsx
* 本质上来讲，JSX 只是为 React.createElement(component, props, ...children) 方法提供的语法糖
* React 会将小写开头的标签名认为是 HTML 原生标签;所以需要首字母大写命名组件
* 可以将字符串常量作为属性值传递。
```html
<MyComponent message="hello world" />
<MyComponent message={'hello world'} />
```

传递一个字符串常量时，它不会对其进行 HTML 转义
```html
<MyComponent message="&lt;3" />
<MyComponent message={'<3'} />
```

* 如果你没有给属性传值，它默认为 true。
```html
<MyTextBox autocomplete />
<MyTextBox autocomplete={true} />
```

* false、null、undefined 和 true 都是有效的子代，但它们不会直接被渲染，可以根据条件来确定是否渲染React元素
```html
<div>
  {showHeader && <Header />}
  <Content />
</div>
```
showHeader根据showHeader的值来决定是否渲染Header
* 值得注意的是，JavaScript 中的一些 “falsy” 值(比如数字0)，它们依然会被渲染。
##### css选择元素优先级
.ant-select与.selectId指向同一元素
```css
form .ant-select{  
    width: 100%;
}
.selectId {
    width: 70%;
}
```

前者优先级1+10；后者优先级10；所以无法覆盖前者
```css
form .ant-select{  
    width: 100%;
}
from.selectId {
    width: 70%;
}
```
后者样式覆盖前者
##### dom事件

###### dom事件级别
* DOM零级事件绑定，只能给当前元素的某一个行为绑定一个方法，绑定的最后一个方法会把前面的所有绑定的方法给覆盖掉
* addEventListener/removeEventListener实现DOM二级事件绑定和移除绑定，
第三个参数：true表示捕获，false表示冒泡，不填时默认为false
* removeEventListener与addEventListener 的函数参数必须完全一致,才能移除有效
* 函数带参数时，绑定事件无效
```a.addEventListener('click',fun1(e));//无效```
有效
```a.addEventListener('click',fun1);```
```var fun1=function(e){}```

###### 实现一个通用的事件注册函数
```javascript
function addEvent(element,type,handler){//DOM2方法
    if(element.addEventListener){
        element.addEventListener(type,handler,false);
    }
    else if(element.attachEvent){//IE方法
        element.attachEvent("on"+type,handler);
    }
    else{//DOM0方法
        element["on"+type]=handler;
    }
}
```
###### html杂记
* h1元素不能包含其他块级元素；
* dt元素内不能包含其他块级元素
* p元素内不能包含其他块级元素；


