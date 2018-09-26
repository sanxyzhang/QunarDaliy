## css布局相关
实现两个p布局，高度为200px，左边固定p宽度100px，右边p自适应。
```html
<p class="container">  
        <p class="left"></p>  
        <p class="right"></p>  
</p>  
```
1. Position实现
关键代码
```css
.container{
    width:100%;
    position:relative;
}
.left{
    position:absolute;
    background-color:red;
    height:200px;
    width:100px;
    left:0p;
}
.right{
    position:absolute;
    background-color:blue;
    height:200px;
    left:100px;
    right:0;
}
```
2. float实现
关键代码
```css
.container{
    width:100%;
    height:200px;
}
.left{
    float:left;
    width:100px;
    background-color:red;
    height:100%;
}
.right{
    margin-left:100px;/* width: calc(100% - 100px);  float:left */
    background-color:blue;
    height:100%;
}
```
3. flex布局
关键代码
```css
        .container{  
            width: 100%;  
            height: 200px;  
            display: flex;  
            flex-direction: row;  
        }  
        .left{  
            flex-basis:100px;  
            background-color: yellow;  
            height: 100%;  
        }  
        .right{  
            background-color: red;  
            flex-grow: 1;  
        }  
```
### 四.最后附上周六日看到一篇掘金小文
[flex布局历险记](http://www.w3cplus.com/css3/flexbox-adventures.html)