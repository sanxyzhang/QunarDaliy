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