## 一.今天进行了退票小助手的需求开发。
由于之前没有接触过这种项目，对流程一脸蒙蔽，产品大哥也不在，只能qtalk交流，没办法，慢慢差不多理解了这个流程吧。读了原有的代码，基于原有代码，进行开发。开发开发，一天就过去啦。
## 周六日看了些东西，没怎么整理，也就放周一日报上一起了。
## 二.深入理解js对象继承
### 1.原型链继承
```javascript
function Parent(name){
    this.name=name;
}
function Child(){
}

Child().prototype= new Parent();
```