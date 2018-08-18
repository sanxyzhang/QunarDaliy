## FifteenthDay
### 联调虚拟卡项目
* 完成11项bug修改
* 完成新增需求
* 熟悉对象操作，数组遍历
* 熟悉前后端联调流程

### html滚动相关
##### Html实现滚动文字-类似网页中的公告
```html
<marquee behavior="scroll" direction="right">
        通知，现在是滚动文字开发！
</marquee>
```
属性:
* align: 对齐方式-top、middle、bottom
* direction: 滚动文字方向-up、left、right、dowm
* behavior: 滚动的方式-scoll（循环滚动）、slide（单次滚动）、alternate(来回滚动)
* loop: 滚动的次数-默认-1且Infinite无限滚动
* scrollamount：滚动的速度
* scrooldelay: 滚动的间隔
* width：滚动区域宽度
* height：滚动区域的高度
* bgcolor: 滚动背景
* hspace: 滚动区域与浏览器边界的水平距离
* wspace: 滚动区域与浏览器边界的垂直距离 

##### 文字过多实现滚动条
###### 1.精简无样式
css设置 width；height为固定值

添加overflow属性为：auto或者scroll

overflow: scroll将隐藏所有溢出的内容并使滚动条出现在相关元素上。如果内容没有溢出，滚动条仍然可见，但被禁用。
overflow: auto 非常相似，但滚动条仅在内容溢出时出现。

所有主流浏览器都支持 overflow 属性。
overflow属性：
* visible	默认值。内容不会被修剪，会呈现在元素框之外。
* hidden	内容会被修剪，并且其余内容是不可见的。
* scroll	内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。
* auto	    如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。

####### webkit支持拥有overflow属性的区域，列表框，下拉菜单，textarea的滚动条自定义样式

::-webkit-scrollbar 滚动条整体部分
::-webkit-scrollbar-thumb  滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）
::-webkit-scrollbar-track  滚动条的轨道（里面装有Thumb）
::-webkit-scrollbar-button 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置。
::-webkit-scrollbar-track-piece 内层轨道，滚动条中间部分（除去）
::-webkit-scrollbar-corner 边角，即两个滚动条的交汇处
::-webkit-resizer 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件

##### 深化对三元运算符的理解
```javascript
            switch (item.matchState) {
                case (0):
                    item.matchState = "无效";
                    break;
                case (1):
                    item.matchState = "未匹配";
                    break;
                case (2):
                    item.matchState = "已匹配";
                    break;
                case (3):
                    item.matchState = "已退款";
                    break;
            }
```
使用三元运算符精简操作

```function choose(n){ return n==1? "first": n==2? "second" : n==3? "third" : "other"} ```