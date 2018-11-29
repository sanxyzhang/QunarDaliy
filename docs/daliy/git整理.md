### git的三个状态
1. Untracked：文件还未被git add，对应工作区（Working Directory）。
2. Staged：git add 后所处的状态， 对应暂存区（Stage）。
3. Committed：git commite后所处的状态，对应版本库（Commit History）。

### git 查看文件内容，对应键值
#### git ls-files [reg]
  *  -z                    paths are separated with NUL character
  *  -t                    identify the file status with tags
  *  -v                    use lowercase letters for 'assume unchanged' files
  *  -f                    use lowercase letters for 'fsmonitor clean' files
  *  -c, --cached          show cached files in the output (default)
  *  -d, --deleted         show deleted files in the output
  *  -m, --modified        show modified files in the output
  *  -o, --others          show other files in the output
  *  -i, --ignored         show ignored files in the output
  *  -s, --stage           show staged contents' object name in the output
  *  -k, --killed          show files on the filesystem that need to be removed
  *  --directory           show 'other' directories' names only
  *  --eol                 show line endings of files
  *  --empty-directory     don't show empty directories
  *  -u, --unmerged        show unmerged files in the output
  *  --resolve-undo        show resolve-undo information
  *  -x, --exclude <pattern>
  *                        skip files matching pattern
  *  -X, --exclude-from <file>
  *                        exclude patterns are read from <file>
  *  --exclude-per-directory <file>
  *                        read additional per-directory exclude patterns in <file>
  *  --exclude-standard    add the standard git exclusions
  *  --full-name           make the output relative to the project top directory
  *  --recurse-submodules  recurse through submodules
  *  --error-unmatch       if any <file> is not in the index, treat this as an error
  *  --with-tree <tree-ish>
  *                        pretend that paths removed since <tree-ish> are still present
  *  --abbrev[=<n>]        use <n> digits to display SHA-1s
  *  --debug               show debugging data

#### git cat-file:取出数据
 *  -t                    show object type
 *  -s                    show object size
 *  -e                    exit with zero when there's no error
 *  -p                    pretty-print object's content
 *  --textconv            for blob objects, run textconv on object's content
 *  --filters             for blob objects, run filters on object's content
 *  --path <blob>         use a specific path for --textconv/--filters
 *  --allow-unknown-type  allow -s and -t to work with broken/corrupt objects
 *  --buffer              buffer --batch output

#### 一个空的文件夹是否能添加到 git 项目中？
答：不可以。因为 git 使用的索引机制，是以文件为git最小单位存储内容，跟踪变化的。 那么怎么做才可以使这个文件夹存在呐？通常的做法是在里面新建一个名为 .gitkeep 的文件。

#### git diff
* 比较的是工作目录中当前文件和暂存区域快照之间的差异，也就是修改之后还没有暂存起来的变化内容。
* 若要看已经暂存起来的文件和上次提交时的快照之间的差异，可以用 git diff --cached 命令

#### git rm
* git rm --cached filename 仅从缓存区删除文件，工作区保留


### git log
* 简约单行展示：git log --pretty=oneline
* -p	按补丁格式显示每个更新之间的差异。

### 撤销操作
* git reset HEAD <file>...  取消暂存区的文件，回到未add的状态
* git checkout -- filename
* git commit --amend
有时候我们提交完了才发现漏掉了几个文件没有加，或者提交信息写错了。想要撤消刚才的提交操作，可以使用 --amend 选项重新提交，此命令将使用当前的暂存区域快照提交
* git branch -d deleteBranch 删除分支
### git设置别名
* git config --global alias.m  commit
* git config --global alias.a  add
* git config --global alias.l  pull
* git config --global alias.s push
* git config --global alias.co checkout
* git config --global alias.m commit

### 便捷操作
* git checkout -b new-branch
相当于 git branch new-branch + git checkout new-branch
* git commit -a -m "first commit"
相当于 git add . + git commit -m "first commit"
