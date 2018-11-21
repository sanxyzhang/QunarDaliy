### console api
1. console.dirxml
* 用来显示网页的某个节点（node）所包含的html/xml代码
```javascript
 var mytable = document.getElementById('mytable');
    console.dirxml(mytable);
```
2. console.assert
* 对输入的表达式进行断言，只有表达式为false时，才输出相应的信息到控制台
``` console.assert(false,"为false输出的值")```

3. console.count
* 统计代码被执行的次数，写在函数内部

4. console.dir
* 直接将该DOM结点以DOM树的结构进行输出，可以详细查对象的方法发展等等
* node有时会对console.log报错，需要用console.dir

### react可以不适应jsx
* 每一个JSX元素都只是 React.createElement(component, props, ...children) 的语法糖。
```javascript
const e = React.createElement;

ReactDOM.render(
  e('div', null, 'Hello World'),
  document.getElementById('root')
);
```

### react Fragment
* React 中一个常见模式是为一个组件返回多个元素。Fragments 可以让你聚合一个子元素列表，并且不在DOM中增加额外节点。

```javascript
class Columns extends React.Component {
  render() {
    return (
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    );
  }
}
```

* 在 React 中， <></> 是 <React.Fragment/> 的语法糖。

```javascript
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
```

* <></> 语法不能接受键值或属性。如果你需要一个带 key 的片段，你可以直接使用 <React.Fragment /> 。

```javascript
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // 没有`key`，将会触发一个key警告
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```

#### gridview处理数据
```javascript
	/*getDate主要功能是获取列表数据，如果响应中除了包含列表数据外还有其他数据如后端返回的过滤条件，则需要个回调函数来单独处理这部分过滤条件*/
	getData:function(beforeSend, processData, callback){
		var self=this;
        var _spec = this._spec || {};
		var spec= {
			type:this.options.type,
			url:this.options.url,
			data:this.options.condition,
			dataType: "json",
			beforeSend: _spec.beforeSend || function(){
				beforeSend && beforeSend();
			},
			success: _spec.success ||function(rs){
				self.data=rs.data;
				if(rs.status==1 || rs.ret){
					self.data = !processData?rs.data:processData(rs.data);
					self.render(self.data);
				}else{
					var dt={};
					if(self.options.resultKey){
						dt[self.options.resultKey]=[];
						self.render(dt);
					}else{
						self.render([]);
					}
				};
				callback && callback(self.data, self);
			},
			error:function(e){
				self.render();
			}
		};
		this._spec = spec;
		$.ajax(spec);
	},
```