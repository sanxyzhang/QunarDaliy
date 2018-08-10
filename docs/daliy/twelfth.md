## TwelfthDay
### 二进制正负数的原码、反码、补码之间的转化
1、正数的二进制原码、反码、补码都是相同
2.负数的二进制原码：先计算该负数绝对值的二进制。之后对其每个数“取反”，然后加一。
第一步：-32：绝对值二进制，00100000（2）
第二步：取反：11011111
第三步：加1：11100000

3.负数的反码：等于原码的最高位不变，其余取反。
11100000 => 10011111

4.负数的补码：等于原码的最高位不变，其余取反，然后加一。
原码：11100000=>10011111=>10100000

### <a>标签中href="javascript:;"
例子：<a href="javascript:;">我的大学</a>
javascript: 是一个伪协议

javascript:是表示在触发<a>默认动作时，执行一段JavaScript代码，而 javascript:; 表示什么都不执行，这样点击<a>时就没有任何反应。

href="javascript:;"就是去掉a标签的默认行为，跟href="javascript:void(0)"是一样的

void 是JavaScript 的一个运算符，void(0)就是什么都不做的意思。

### git常用指令
git branch建立分支
git branch branch-name 起分支名
git add .
git commit -m "mess"
git checkout branch-name
git checkout master
git pull
git merge master
git push -u origin HEAD