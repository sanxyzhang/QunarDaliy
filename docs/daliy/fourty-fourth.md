### 1.大龙国内日报开发。
开发比较闲，就光看前人写的代码了，写的真的比我强多了，函数封装的贼舒服，大幅度减少了代码的冗余。嗯，今天在看看，明天总结一下。
### 2.nginx
1. nginx的一些内置变量
* $arg_PARAMETER 这个变量包含在查询字符串时GET请求PARAMETER的值。
* $args 这个变量等于请求行中的参数。
* $host 请求中的主机头字段，如果请求中的主机头不可用，则为服务器处理请求的服务器名称
* $remote_addr 客户端的IP地址。
* $request_uri 这个变量等于包含一些客户端请求参数的原始URI，它无法修改，请查看$uri更改或重写URI
* $uri 请求中的当前URI(不带请求参数，参数位于$args)，可以不同于浏览器传递的$request_uri的值，它
可以通过内部重定向，或者使用index指令进行修改。
* $scheme HTTP方法（如http，https）
* $server_addr 服务器地址，在完成一次系统调用后可以确定这个值，如果要绕开系统调用，则必须在listen中指
定地址并且使用bind参数。
* $server_name 服务器名称。
2. Nginx做反向代理和负载均衡时“X-Forwarded-For”信息头的处理
* X-Forwarded-For:简称XFF头，它代表客户端，也就是HTTP的请求端真实的IP，只有在通过了HTTP 代理或者负载均衡服务器时才会添加该项。它不是RFC中定义的标准请求头信息，在squid缓存代理服务器开发文档中可以找到该项的详细介绍。
标准格式如下：X-Forwarded-For: client1, proxy1, proxy2
* $proxy_add_x_forwarded_for变量包含客户端请求头中的"X-Forwarded-For"，与$remote_addr用逗号分开，如果没有"X-Forwarded-For" 请求头，则$proxy_add_x_forwarded_for等于$remote_addr。$remote_addr变量的值是客户端的IP。

### 3.DOM

### document类型
1. document.documentElement 指向<html>元素，document.body指向<body>标签；
2. document的三个网页请求有关的属性：URL，domian，referrer(保存着链接到当前页面的那个界面的url)