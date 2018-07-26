# Second Day
### 1.看react文档时遇到了一个setState接受函数做参数的问题，不是很懂，现整理一下解决思路，顺便复习一下之前的东西
setState() 不仅能够接受一个对象作为参数，还能够接受一个函数作为参数。函数的参数即为 state 的前一个状态以及 props。
所以，我们可以向下面这样来更新 state:
```this.setState((prevState, props) => ({ count: prevState.count + 1 }));```
我们在处理异步更新的时候，需要用到传入函数的方式来更新我们的 state。这样，在更新下一个 state 的时候，我们能够正确的获取到之前的 state，并在在其基础之上进行相应的修改。而不是简单地执行所谓的对象合并。
[理解传对象更新和传参数更新的区别](https://www.cnblogs.com/libin-1/p/6725774.html)
传对象弊端原理类似assign()
### 2.由assgin到浅拷贝以及深拷贝
 所谓的浅复制，只是拷贝了基本类型的数据，而引用类型数据，复制后也是会发生引用，我们把这种拷贝叫做“（浅复制）浅拷贝”。
 #####深拷贝
```javascript
 function deepClone(obj){
    let objClone = Array.isArray(obj)?[]:{};
    if(obj && typeof obj==="object"){
        for(key in obj){
            if(obj.hasOwnProperty(key)){
                //判断ojb子元素是否为对象，如果是，递归复制
                if(obj[key]&&typeof obj[key] ==="object"){
                    objClone[key] = deepClone(obj[key]);
                }else{
                    //如果不是，简单复制
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
} 
```
###一层深拷贝的几种简单做法
* Array.slice(start,end);
* json序列化反序列化
```javascript
function deepClone(obj){
    let _obj = JSON.stringify(obj),
        objClone = JSON.parse(_obj);
    return objClone
} 
```
*借助jquery的extend函数
```$.extend( [deep ], target, object1 [, objectN ] )```
deep表示是否深拷贝，为true为深拷贝，为false，则为浅拷贝
target Object类型 目标对象，其他对象的成员属性将被附加到该对象上。
object1  objectN可选。 Object类型 第一个以及第N个被合并的对象。
```javascript
let a=[0,1,[2,3],4],
    b=$.extend(true,[],a);
a[0]=1;
a[2][0]=1;
console.log(a,b);
  ```
  ### 3.完成仿app页面的拖动隐藏header和footer页面
  #####熟悉使用css3动画
  animation属性是一个简写属性，用于设置动画属性
* animation-name   @keyframe
* animation-duration  动画指定需要多少秒或毫秒完
* animation-timing-function  
       linear  匀速
       ease   先慢后快，结束前变慢     默认
       ease-in    低速开始
       ease-out  低速结束
       ease-in-out   低速开始和结束
       cubic-bezier(n,n,n,n)    在 cubic-bezier 函数中自己的值。可能的值是从 0 到 1 的数值
* animation-delay  动画在启动前的延迟间隔
* animation-iteration-count 动画的播放次数
* animation-direction
* animation-fill-mode 当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要处于什么状态
       none   默认，播放完动画后，画面停在起始位置
       forwards     播放完动画，停在animation定义的最后一帧(保持最后一个属性值)
       backwards   如果设置了animation-delay，在开始到delay这段时间，画面停在第一帧。如果没有设置delay，画面是元素设置的初始值
       both   设置动画状态为动画结束或开始的状态（例如设置奇数播放为forwards状态，偶数播放为backwards状态
* animation-play-state  动画是否正在运行或已暂停
       paused   指定暂停动画
       running   指定正在运行的动画，默认
### 4.熟悉使用flex布局
### 5.学习使用节流去抖，并对3中滚动进行优化。
#### 去抖
```javascript
window.debounce = function(fun,dely){ 
    var timer = null; 
    return function(){
        var context = this;  
        var args = arguments;  
        if(timer) { clearTimeout(timer) }; // 看似多余的 但是是必须的 读者可以自己思考为什么需要这么处理
        var doNow = !timer; // 判断是否有定时器，如果有，就dely后清除timer，否则立即执行；
        timer = setTimeou(function(){
            timer = null ;
        },dely)
        if(doNow){
            fun.apply(context, args);
        }
    }
}
```
#### 节流
```javascript
window.throttle = function(fun,delay){
    var timer = null;
    var startTime = Date.now();  

    return function(){
        var curTime = Date.now();
        var remaining = delay-(curTime-startTime);  // 计算出两次触发的时间间隔有没有大余delay 
        var context = this;
        var args = arguments;

        clearTimeout(timer);
        if(remaining<=0){ 
            func.apply(context,args);
            startTime = Date.now();  // 如果两次触发时间大余delay，则立马触发一次任务函数并且更新起始时间戳
        }else{
            timer = setTimeout(fun,remaining);  // 如果两次触发时间小于delay， 则改变定时器时间保证delay时间一定触发任务函数
        }
    }
}
```
#### 引用源码封装好的库
```<script src="//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min.js"></script>```

```_.debounce(func, [wait=0], [options={}])```

lodash在opitons参数中定义了一些选项，主要是以下三个

* leading，函数在每个等待时延的开始被调用，默认值为false
* trailing，函数在每个等待时延的结束被调用，默认值是true
* maxwait，最大的等待时间，因为如果debounce的函数调用时间不满足条件，可能永远都无法触发，因此增加了这个配置，保证大于一段时间后一定能执行一次函数
根据leading和trailing的组合，可以实现不同的调用效果：
* leading-false，trailing-true：默认情况，即在延时结束后才会调用函数
* leading-true，trailing-true：在延时开始时就调用，延时结束后也会调用
* leading-true, trailing-false：只在延时开始时调用
deboucne还有cancel方法，用于取消防抖动调用
总结
* 防抖动debounce：将几次操作合并为一此操作进行。原理是维护一个计时器，规定在delay时间后触发函数，但是在delay时间内再次触发的话，就会取消之前的计时器而重新设置。这样一来，只有最后一次操作能被触发。
* 函数包含debounce，还为debounce 传了一个 maxWait 选项，这个选项的意思是至少保证在每 maxWait 时间让 func 被调用一次。

使用场景
* input 中输入文字自动发送 ajax 请求进行自动补全： debounce
* resize window 重新计算样式或布局：debounce
* scroll 时更新样式，如随动效果：throttle
