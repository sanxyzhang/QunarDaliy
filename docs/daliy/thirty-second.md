## 完成了退票小工具的开发，使用Charles进行mock数据
## 一.Flex布局相关知识
### 容器属性
1. flex-direction:row|row-reverse|column|column-reverse
2. flex-wrap: nowrap|wrap|wrap-reverse
3. flex-flow: <flex-direction>||<flex-wrap>
4. justify-content:flex-start|flex-end|center|space-between(两边紧贴)|space-around(两边有空)
5. align-items:flex-start|flex-end|center|baseline(项目的第一行文字的基线对齐)|stretch
6. align-content:flex-start|flex-end|center|space-between|space-around|stretch
### 项目的属性
1. order: <integer> 属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
2. flex-grow:<number>属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
3. flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
4. flex-basic:<length>|auto  属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
5. flex:none|flex-grow|flex-shrink|flex-basis
* 默认值：0 1 auto(不放大。可缩小，项目原来大小);auto：1，1，auto(可大可小)；none:0，0，auto(不可大，不可小)
6. align-self: auto | flex-start | flex-end | center | baseline | stretch;
* 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
7. 当 flex 取值为一个非负数字，则该数字为 flex-grow 值，flex-shrink 取 1，flex-basis 取 0%：
```css
.item {flex: 1;}
.item {
flex-grow: 1;
flex-shrink: 1;
flex-basis: 0%;
}
```
### 二.css伪元素和伪类
#### 伪类
##### 1.状态伪类
* :link, :hover, :active, :visited, :focus
##### 2.结构性伪类
* :first-child, :last-child, nth-child(n) :nth-last-child(),
* :nth-of-type() 选择指定的元素；
* :nth-last-of-type() 选择指定的元素，从元素的最后一个开始计算；
* :first-of-type 选择一个上级元素下的第一个同类子元素；
* :last-of-type 选择一个上级元素的最后一个同类子元素；
* :only-child 选择的元素是它的父元素的唯一一个子元素；
* :only-of-type 选择一个元素是它的上级元素的唯一一个相同类型的子元素；
* :empty 选择的元素里面没有任何内容。
#### 伪元素
伪元素是对元素中的特定内容进行操作，而不是描述状态。它的操作层次比伪类更深一层，因此动态性比伪类低很多。实际上，伪元素就是选取某些元素前面或后面这种普通选择器无法完成的工作。控制的内容和元素是相同的，但它本身是基于元素的抽象，并不存在于文档结构中！
* :first-letter 选择元素文本的第一个字（母）。
* :first-line 选择元素文本的第一行。
* :before 在元素内容的最前面添加新内容。
* :after 在元素内容的最后面添加新内容。

### 三.打乱数组排序，超简洁
```javascript
function randomsort(a,b){
    return Math.random>0.5?-1:1;
}
var arr=[1,2,3,4,5];
arr.sort(randomsort)
```