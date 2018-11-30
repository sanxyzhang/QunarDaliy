### ls
* ls -a 显示隐藏文件
* ls -l 显示详细信息
* ls -lh 文件大小转K,Mb,等格式
* man ls 查看提示帮助

### cd
* cd - 会发上一次目录
* cd . 当前目录
* cd 进入home目录

### cp mv rm
* cp index.js indexbak.js
* cp -r src srcbak  -r表示递归复制
* mv copy copy1 重命名copy
* rm -v file    -v提示删除什么文件

### link
* 软连接 ln -s 删除原生文件，则连接损坏
* 硬链接，无法连接文件,删除原文件，连接仍可使用

### 文件查找
* find . name "*.md" 查找当前目录下.md结尾的文件
* find . -mtime +3 -type f  表示只找文件不找目录-type f  

### 查看文件
* cat index.js
* head -10 index.js
* tail -10 index.js
* tail -f index.js 适用于日志文件持续输出
* grep console.log ./index   grep+关键字+文件名称
* sort index.js | uniq -c |sort -k1,1nr|head  去重并统计次数uniq -c，  -k1按第一列排序， r倒序排列

### 打包压缩
 * tar -zcvf closer.tgz closerAndLet.html 压缩 v打印信息，f强制
 * tar -tvf closer.tgz 非解压查看-t
 * tar -xzvf closer.tgz 解压-x

### grep
* grep [-acinv] [--color=auto] '搜寻字符串' filename
* 选项与参数：
1. -a ：将 binary 文件以 text 文件的方式搜寻数据
2. -c ：计算找到 '搜寻字符串' 的次数
3. -i ：忽略大小写的不同，所以大小写视为相同
4. -n ：顺便输出行号
5. -v ：反向选择，亦即显示出没有 '搜寻字符串' 内容的那一行！
6. --color=auto ：可以将找到的关键词部分加上颜色的显示喔！

### curl
* 登录


* 提交 

### wc
* wc [-clw][--help][--version][文件...]
1. -c或--bytes或--chars 只显示Bytes数。
2. -l或--lines 只显示行数。
3. -w或--words 只显示字数。
* wc testfile => 3 92 598 testfile  # testfile文件的行数为3、单词数92、字节数598 

### sort
* sort <file1> [<file2> [<file3> [...]]] sort 可以连续读入多个文件，而后合在一起排序。
* -t<分隔字符>：指定排序时所用的栏位分隔字符；
* -o<输出文件>：将排序后的结果存入制定的文件；

```javascript
sort -nrk 3 -t: sort.txt
eee:40:5.4
eee:60:5.1
ddd:20:4.2
ccc:50:3.3
bbb:10:2.5
aaa:30:1.6
AAA:BB:CC
//-n是按照数字大小排序，-r是以相反顺序，-k是指定需要爱排序的栏位，-t指定栏位分隔符为冒号
```
### uniq
* -d或--repeated：仅显示重复出现的行列；sort file.txt | uniq -d
* -c或——count：在每列旁边显示该行重复出现的次数；
* -u或——unique：仅显示出一次的行列；

### chmod
* [ugoa...][[+-=][rwxX]...][,...]
* r=4，w=2，x=1
* chmod 777 file => chmod a=rwx file
* chmod 771 file => chmod ug=rwx,o=x file