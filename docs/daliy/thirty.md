### 1.周四一天，搞定了趣浪权限管理界面分离
1. $.Channel.trigger('cmd.flushGrid');界面刷新的api
2. 前端跨域，打到node端进行请求转发
3. ```$.Channel.on('grid.init', function (evt, gridList, opts) {}```

对返回数据进行处理，以打到form组件可接受的参数形势
4. form中设置为disable的input内的值不会提交到表单数据中。

### 2.通过set进行数组去重
```javascript
let arr = [4,2,4,2,1,3];
let uniqueArr = [...new Set(arr)];
console.log(uniqueArr);
```
1. new Set([iterable])  iterable:可迭代对象，默认为空。
2. Set方法
* add：添加值，返回Set本身。
* delete：删除值，返回是否删除成功。
* has：判断是否拥有这个值，返回true/false。
* clear：清除所有值。

### 3.slice和splice的区别
1. slice(start,end)：方法可从已有数组中返回选定的元素，返回一个新数组，包含从start到end（不包含该元素）的数组元素。
* 该方法不会改变原数组，而是返回一个子数组，如果想删除数组中的一段元素，应该使用Array.splice()方法。
