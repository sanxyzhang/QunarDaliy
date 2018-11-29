## EighthDay
### nginx相关配置研读
``` proxy_set_header   X-real-ip   $remote_addr ```

** 含义 ** 
经过反向代理后，由于在客户端和web服务器之间增加了中间层，因此web服务器无法直接拿到客户端的ip，通过$remote_addr变量拿到的将是反向代理服务器的ip地址”。这句话的意思是说，当你使用了nginx反向服务器后，在web端使用request.getRemoteAddr()（本质上就是获取$remote_addr），取得的是nginx的地址，即$remote_addr变量中封装的是nginx的地址，当然是没法获得用户的真实ip的，但是，nginx是可以获得用户的真实ip的，也就是说nginx使用$remote_addr变量时获得的是用户的真实ip，如果我们想要在web端获得用户的真实ip，就必须在nginx这里作一个赋值操作.

获取真是token的第二种办法
```   proxy_set_header    X-Forwarded-For  $proxy_add_x_forwarded_for;```

$proxy_add_x_forwarded_for变量包含客户端请求头中的"X-Forwarded-For"，与$remote_addr两部分，他们之间用逗号分开。

举个例子，有一个web应用，在它之前通过了两个nginx转发，www.linuxidc.com 即用户访问该web通过两台nginx。

在第一台nginx中,使用

proxy_set_header            X-Forwarded-For $proxy_add_x_forwarded_for;

现在的$proxy_add_x_forwarded_for变量的"X-Forwarded-For"部分是空的，所以只有$remote_addr，而$remote_addr的值是用户的ip，于是赋值以后，X-Forwarded-For变量的值就是用户的真实的ip地址了。

到了第二台nginx，使用

proxy_set_header            X-Forwarded-For $proxy_add_x_forwarded_for;

现在的$proxy_add_x_forwarded_for变量，X-Forwarded-For部分包含的是用户的真实ip，$remote_addr部分的值是上一台nginx的ip地址，于是通过这个赋值以后现在的X-Forwarded-For的值就变成了“用户的真实ip，第一台nginx的ip”，这样就清楚了吧。

最后我们看到还有一个$http_x_forwarded_for变量，这个变量就是X-Forwarded-For，由于之前我们说了，默认的这个X-Forwarded-For是为空的，所以当我们直接使用proxy_set_header            X-Forwarded-For $http_x_forwarded_for时会发现，web服务器端使用request.getAttribute("X-Forwarded-For")获得的值是null。如果想要通过request.getAttribute("X-Forwarded-For")获得用户ip，就必须先使用proxy_set_header            X-Forwarded-For $proxy_add_x_forwarded_for;这样就可以获得用户真实ip。
** request.getAttribute("X-real-ip") 这样就可以获取到客户端的ip了**

** ngx_http_proxy_module的proxy_pass详解 **
语法: proxy_pass URL;

场景: location, if in location, limit_except

说明: 设置后端代理服务器的协议(protocol)和地址(address),以及location中可以匹配的一个可选的URI。协议可以是"http"或"https"。地址可以是一个域名或ip地址和端口，或者一个 unix-domain socket 路径。

##### proxy_pass后，后端服务器的url(request_uri)情况分析
```javascript
server {
    listen      80;
    server_name www.test.com;

    // 情形A
    // 访问 http://www.test.com/testa/aaaa
    // 后端的request_uri为: /testa/aaaa
    location ^~ /testa/ {
        proxy_pass http://127.0.0.1:8801;
    }
    
    // 情形B
    // 访问 http://www.test.com/testb/bbbb
    // 后端的request_uri为: /bbbb
    location ^~ /testb/ {
        proxy_pass http://127.0.0.1:8801/;
    }

    // 情形C
    // 下面这段location是正确的
    location ~ /testc {
        proxy_pass http://127.0.0.1:8801;
    }

    // 情形D
    // 下面这段location是错误的
    //
    // nginx -t 时，会报如下错误: 
    //
    // nginx: [emerg] "proxy_pass" cannot have URI part in location given by regular 
    // expression, or inside named location, or inside "if" statement, or inside 
    // "limit_except" block in /opt/app/nginx/conf/vhost/test.conf:17
    // 
    // 当location为正则表达式时，proxy_pass 不能包含URI部分。本例中包含了"/"
    location ~ /testd {
        proxy_pass http://127.0.0.1:8801/;   // 记住，location为正则表达式时，不能这样写！！！
    }

    // 情形E
    // 访问 http://www.test.com/ccc/bbbb
    // 后端的request_uri为: /aaa/ccc/bbbb
    location /ccc/ {
        proxy_pass http://127.0.0.1:8801/aaa$request_uri;
    }

    // 情形F
    // 访问 http://www.test.com/namea/ddd
    // 后端的request_uri为: /yongfu?namea=ddd
    location /namea/ {
        rewrite    /namea/([^/]+) /yongfu?namea=$1 break;
        proxy_pass http://127.0.0.1:8801;
    }

    // 情形G
    // 访问 http://www.test.com/nameb/eee
    // 后端的request_uri为: /yongfu?nameb=eee
    location /nameb/ {
        rewrite    /nameb/([^/]+) /yongfu?nameb=$1 break;
        proxy_pass http://127.0.0.1:8801/;
    }

    access_log /data/logs/www/www.test.com.log;
}

server {
    listen      8801;
    server_name www.test.com;
    
    root        /data/www/test;
    index       index.php index.html;

    rewrite ^(.*)$ /test.php?u=$1 last;

    location ~ \.php$ {
        try_files $uri =404;
        fastcgi_pass unix:/tmp/php-cgi.sock;
        fastcgi_index index.php;
        include fastcgi.conf;
    }

    access_log /data/logs/www/www.test.com.8801.log;
}

```

##### nginx反向代理解决跨域问题
原：localhost:5000向localhost:5001请求数据，浏览器会报跨域访问错误

使用nginx修改后：

1.使localhost:5017代理localhost:5000

2.使localhost:5017/proxy代理localhost:5001

3.使localhost:5017/proxy/api/代理localhost:5001/api/
### 2.练习正则表达式以及js相关方法
##### 正则表达式
###### 匹配五个字母组成的单词

These are some phonenumbers 915-555-1234

\b\w{5}\b

###### 分类符[]
```The lynk is quite a link don't you think? l nk l(nk```
正则表达式： l[yi (]k

result:```lynk  link  l nk   l(nk```

###### []的特殊语法
1.-连接符不是第一个字符时
[-.]的含义是连字符-或者点符.。 但是，如果当连字符不是第一个字符时，比如[a-z]，这就表示是从字母a到字符z。

2.[]中的^
^在之前是表示一行开头，但是在[]中，有着不同的含义。[ab] 表示a或者b;[^ab] 啥都行，只要不是a或b(anythings except a and b)，相当于取反

###### 分组捕获
212-555-1234

\d{3}-\d{3}-\d{4}    212-555-1234   Group0

\d{3}-(\d{3})-\d{4}     555         Group1

\d{3}-(\d{3})-(\d{4})    1234           Group2

** 匹配markdown中的link标签，并替换为html标签 **
[google](http://google.com)
[itp](http://itp.nyu.edu)
[Coding Rainbow](http://codingrainbow.com)

``` reg: \[(.*?)\]\((http.*?)\)   replace: <a href="$2">$1</a>```

This is is a a dog , I think think this is is really
a a good good dog. Don't you you thinks so so ? 

匹配is is so so 等连续序列： \b(\w+)\s\1\b

选择器可以使用$1和\1，但是使用场景不同，\用在正则表达式自己身上

?符号可以禁止贪婪属性，放在.*之后，表示一次匹配遇到重点就可以停止。否则将会一直向后匹配。
##### stringObj.replace(rgExp, replaceText) 

replace函数返回根据正则表达式进行文字替换后的字符串的复制。 

字符串stringObj，rgExp正则表达式，replaceText所替换的内容 

replace不会修改原字符串，只是返回一个修改后的字符串;除此外，正则表达式如果没有使用g标志，也和match一样，只匹配/替换第一个

##### objReg.test(objStr) 
该方法的返回值是布尔值，通过该值可以匹配字符串中是否存在于正则表达式相匹配的结果，如果有匹配内容，返回ture，如果没有匹配内容返回false，该方法常用于判断用户输入数据的合法性，比如检验Email的合法性


### 3.Iterator研读
##### 定义
它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

遍历器对象本质上，就是一个指针对象。
##### 作用
一.是为各种数据结构，提供一个统一的、简便的访问接口；

二是使得数据结构的成员能够按某种次序排列；

三是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。