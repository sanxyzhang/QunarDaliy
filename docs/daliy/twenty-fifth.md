##### 1.联调了一天，加了好多新东西，对完case，怎么跟需求文档差这么多呢。左添油，右添醋，终于添完了
###### 2.<Col span={24} push={6}>
这个栅格布局啊，总栅格是24，push之后并不会把屏幕顶到max就完事了，还会加滚动条！滚动条！
所以还是改为 <Col span={18} push={6}> 比较稳妥。
###### 3.实践得真理啊
* 开始，在每个组件中的方法绑定bind(this)
* 然后，这样不好啊，每次渲染组件的时候都会再次进行绑定，次数多，麻烦啊，应该在构造函数中进行一次绑定
* 最后，箭头函数绑定貌似更简洁一点，还容易理解，让人舒服
###### 4.inline,block,inline-block详解
** block **:p,dl,dt,ol,pre;
block 元素独占一行，宽度沾满父元素宽度。可以设置 width, height, padding, margin 属性。

** inline **:span, a, strong, em, label, input, select, textarea, img, br 
 宽度由其内容决定。设置 width, height 无效
 设置水平方向 padding(padding-left, padding-right) 和 margin(margin-left, margin-right) 有效， 垂直方向的 padding(padding-top, padding-bottom)，margin(margin-top, margin-bottom) 无效

 ** inline-block **
 inline-block就是将对象呈现为inline对象，但是对象的内容作为block对象呈现。之后的内联对象会被排列在同一行内。比如我们可以给一个link（a元素）inline-block属性值，使其既具有block的宽度高度特性又具有inline的同行特性。 
一句话，inline-block可以使元素被排列在同行并具有宽度高度等特性。

需要注意的是，IE（低版本IE）本来是不支持inline-block的，所以在IE中对内联元素使用display:inline-block，理论上IE是不识别的，但使用display:inline-block在IE下会触发layout，从而使内联元素拥有了display:inline-block属性的表象。