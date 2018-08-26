#### 1.学习Ant Design并编写提交申诉页面
整明白ant的了gird栅格布局，对不同尺寸设备进行设置以实现响应式
详读form表单的各种校验，迷迷糊糊也没整多明白，不说了，我再好好看看吧，api太多了，例子太少了，只能自己挨个试试了。

#### 2.hiproxy
hiproxy start --https --open -r rewrite

#### 3.鼠标滚动事件

滚轮事件只有firefox比较特殊，使用DOMMouseScroll; 其他浏览器使用mousewheel;

1. mousewheel事件中的 “event.wheelDelta”属性值：返回的值，如果是正值说明滚轮是向上滚动，如果是负值说明滚轮是向下滚动；返回的值，均为 120 的倍数，即：幅度大小 = 返回的值 / 120。 
2. DOMMouseScroll事件中的 “event.detail” 属性值：返回的值，如果是负值说明滚轮是向上滚动（与 “event.wheelDelta” 正好相反），如果是正值说明滚轮是向下滚动；返回的值，均为 3 的倍数，即：幅度大小 = 返回的值 / 3。 
3. mousewheel事件在 Opera 10+ 中却是个特例，既有 “event.wheelDelta” 属性，也有 “event.detail” 属性。

#### 4.子元素scroll父元素容器不跟随滚动JS实现
```javascript
$.fn.scrollUnique = function() {
    return $(this).each(function() {
        var eventType = 'mousewheel';
        // 火狐是DOMMouseScroll事件
        if (document.mozHidden !== undefined) {
            eventType = 'DOMMouseScroll';
        }
        $(this).on(eventType, function(event) {
            // 一些数据
            var scrollTop = this.scrollTop,
                scrollHeight = this.scrollHeight,
                height = this.clientHeight;

            var delta = (event.originalEvent.wheelDelta) ? event.originalEvent.wheelDelta : -(event.originalEvent.detail || 0);        

            if ((delta > 0 && scrollTop <= delta) || (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)) {
                // IE浏览器下滚动会跨越边界直接影响父级滚动，因此，临界时候手动边界滚动定位
                this.scrollTop = delta > 0? 0: scrollHeight;
                // 向上滚 || 向下滚
                event.preventDefault();
            }        
        });
    });	
};
```

#### 5.熟悉Ant Design相关组件
##### 数字输入框
```javascript
import { InputNumber } from 'antd';

function onChange(value) {
  console.log('changed', value);
}

ReactDOM.render(
  <div>
    <InputNumber
      defaultValue={1000}
      formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={value => value.replace(/\$\s?|(,*)/g, '')}
      onChange={onChange}
    />
    <InputNumber
      defaultValue={100}
      min={0}
      max={100}
      formatter={value => `${value}%`}
      parser={value => value.replace('%', '')}
      onChange={onChange}
    />
  </div>,
  mountNode);
```
formatter用来显示input中的格式
parser用来将显示出来的格式进行转换数字用来传输

