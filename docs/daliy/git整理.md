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
