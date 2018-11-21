## css揭秘
### 背景与边框

#### outline 
1. （轮廓）是绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用。
2. outline-color outline-style outline-width

#### HSLA(H,S,L,A)
1. H：Hue(色调)。0(或360)表示红色，120表示绿色，240表示蓝色，也可取其他数值来指定颜色。取值为：0 - 360
2. S：Saturation(饱和度)。取值为：0.0% - 100.0%
3. L：Lightness(亮度)。取值为：0.0% - 100.0%
4. A：Alpha透明度。取值0~1之间。

#### background 简写属性在一个声明中设置所有的背景属性。
* background: [background-color] [background-image] [background-repeat] [background-attachment] [background-position] / [ background-size] [background-origin] [background-clip];
* 需要注意的是里面的/，它和font以及border-radius里简写方式使用的/用法相似。/可以在支持这种写法的浏览器里在background-position后面接着写background-size。
除此之外，你也可以增加另外两个描述它的属性值： background-origin和 background-clip

1. background-color
2. background-position
3. background-size
4. background-repeat
5. background-origin 背景相对于内容框定位 content-box border-box padding-box(默认)
6. background-clip 背景的绘制区域：border-box 背景被裁剪到边框盒。padding-box content-box
7. background-attachment scroll	默认值。背景图像会随着页面其余部分的滚动而移动 fixed inherit
8. background-image

#### 边框蚂蚁行军效果实现
```css
@keyframes ants { to { background-position: 100% 100% } }

div {
	padding: 1em;
	border: 1px solid transparent;
	background: linear-gradient(white, white) padding-box,
	            repeating-linear-gradient(-45deg, black 0, black 25%, transparent 0, transparent 50%) 0/.6em .6em;
	animation: ants 12s linear infinite;
	
	max-width: 20em;
	font: 100%/1.6 Baskerville, Palatino, serif;
}
```

### 布局
#### width
1. css3为 width 和 height 属性定义了一些新的关键字，其中最有用的应该就是 min-content 了。这个关键字将解析为这个容器内部最大的不可断行元素的宽度（即最宽的单词、图片或具有固定宽度的盒元素）2。

#### 垂直居中
1. 子元素宽高已知
```css
main {
    position: absolute;
    top: calc(50% - h/2);
    left: calc(50% - w/2);
    width: 18em;
    height: 6em;
}
```
2. 子元素宽高未知
* 当我们在 translate() 变形函数中使用百分比值时，是以这个元素自身的宽度和高度为基准进行换算和移动的
```css
main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```
* transform-style: flat(子元素将不保留其 3D 位置)|preserve-3d(保留其 3D 位置);
* 上述解决方案当子元素的高度大于父元素时，子元素将会被剪切掉
##### 解决方案，在子元素css属性中添加 transform-style：preserve-3d

3. 视口解决方案
```css
main {
    width: 18em;
    padding: 1em 1.5em;
    /* margin: 50% auto 0; 50%是相对于width的，所以不符合 */
    margin: 50vh auto 0;
    transform: translateY(-50%);
}
```

4. 基于 Flexbox 的解决方案
```css
body {
    display: flex;
    min-height: 100vh;
    margin: 0;
}

main {
    margin: auto;
}
```
* 请注意，当我们使用 Flexbox 时，margin: auto 不仅在水平方向上将元素居中，垂直方向上也是如此

### border-radius
* 接受水平半径和垂直半径，用/分割； border-radius: 100px / 75px;
* 接受百分比形式；border-radius: 50% / 50%;
* 简写：border-top-left-radius ... 从左上角开始以顺时针顺序
* 水平半径左上角开始以顺时针顺序(四个)/垂直半径从左上角顺时针(四个)

### 实现半圆
border-radius: 50% / 100% 100% 0 0;
* 水平方向左上右上均为宽的一半，50%；
* 垂直方向上，左上右上均为高的100%；

### 实现四分之一椭圆
border-radius: 100% 0 0 0; 
* /前后一致则省略

### css实现北京平行四边形倾斜，文字正常显示

```html
<a href="#yolo" class="button">
    <div>Click me</div>
</a>
```

```css
.button { transform: skewX(-45deg); }
.button > div { transform: skewX(45deg); }
```

### css实现菱形图片
```css
.picture {
    width: 400px;
    transform: rotate(45deg);
    overflow: hidden;
}
.picture > img {
    max-width: 100%;
    transform: rotate(-45deg) scale(1.42);
    /* 放大图片 */
}
```

无法处理非正方形图片

```css
img {
    clip-path: polygon(50% 0, 100% 50%,
                       50% 100%, 0 50%);
    transition: 1s clip-path;
}

img:hover {
    clip-path: polygon(0 0, 100% 0,
                       100% 100%, 0 100%);
}
```