## EleventhDay
##### 输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。
```javascript
 function TreeNode(x) {
            this.val = x;
            this.left = null;
            this.right = null;
        }
        function reConstructBinaryTree(pre, vin)
        {
            if(pre.length===0||!pre){
                return;
            }
            var root = {
                val: pre[0]
            };
            var everyroot =vin.indexOf(pre[0]);
        root.left=reConstructBinaryTree(pre.slice(1,everyroot+1),vin.slice(0,everyroot));
            root.right=reConstructBinaryTree(pre.slice(everyroot+1),vin.slice(everyroot+1));
 
            return root;
        }
        console.log(reConstructBinaryTree('12473568','47215386'));
```

##### jquery事件杂记

jQuery中提供了四种事件监听方式，分别是bind、live、delegate、on，对应的解除监听的函数分别是unbind、die、undelegate、off

a、bind()函数只针对已经存在的元素进行事件的设置。

live(),on.delegate()均支持未来新添加元素的事件设置。

b、bind()函数在jquery1.7版本以前比较受推崇，1.7版本出来之后，官方已经不推荐用bind()，

替代函数为on(),这也是1.7版本新添加的函数，同样，可以用来代替live()函数，live()函数在1.9版本已经删除；

###### 总而言之，就用on吧，别的都不好用
```$(selector).on(event,childSelector,data,function)```
childSelector	可选。规定只能添加到指定的子元素上的事件处理程序（且不是选择器本身，比如已废弃的 delegate() 方法）。

data	可选。规定传递到函数的额外数据。

1.多个事件绑定同一函数
```javascript
$(document).ready(function(){
  $("p").on("mouseover mouseout",function(){
    $("p").toggleClass("intro");
  });
});
```

2.多个事件绑定不同函数;
含有继承关系。
```javascript
$(document).ready(function(){
  $("p").on({
    mouseover:function(){$("body").css("background-color","lightgray");},  
    mouseout:function(){$("body").css("background-color","lightblue");}, 
    click:function(){$("body").css("background-color","yellow");}  
  });

});
```

3.用on()方法绑定多个选择器，多个事件则可以这样写
```javascript
$(document).on({
    mouseenter: function() {
        // Handle mouseenter...
    },
    mouseleave: function() {
        // Handle mouseleave...
    },
    click: function() {
        // Handle click...
    }
}, '#header .fixed-feedback-bn, #sb-sec .feedback-bn');
```

4.绑定自定义事件
```javascript
$(document).ready(function(){

  $("p").on("myOwnEvent", function(event, showName){

    $(this).text(showName + "! What a beautiful name!").show();

  });

  $("button").click(function(){

    $("p").trigger("myOwnEvent",["Anja"]);

  });

});
```

5.传递数据到函数

```javascript
function handlerName(event) 
{
  alert(event.data.msg);
}

$(document).ready(function(){

  $("p").on("click", {msg: "You just clicked me!"}, handlerName)

});
```

