### 1.完成昨天三个小需求的开发并联调结束待提测。
### 2.动态添加下拉菜单
```javascript
exports.createOption = function ($dom, data) {
    var option = [];
    if ($.isArray(data) && data.length) {
        $.each(data, function (i, v) {
            option.push('<option value="', v.code, '">', v.info, '</option>')
        })
    }
    $dom.html(option.join(''));
};
```
### 3.溢出用省略号显示
```css
div{
        width:67px;
        white-space:nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
   }
```

### 4.jquery选择器
```javascript
function getCheck(className) {
    var checked = [],
        $check = $(className, $('#js-container'));
    $.each($check, function (i, v) {
        var temp = $(v);
        if (temp.prop('checked')) {
            checked.push(temp.val())
        }
    });
    return checked.join(',');
}
```

### 5.多选框联动
```javascript
    function initCheck($form,checkContainer,checkItem) {
        var $checkControl = $(checkContainer, $form),
            $check = $(checkItem, $container);

        if ($checkControl.length) {

            $checkControl.on('change', function () {

                if ($checkControl.prop('checked')) {
                    $check.prop('checked', true);
                } else {
                    $check.prop('checked', false);
                }
            });

            $form.on('change', checkItem, function () {
                var flag = true,
                    checkNum = $check.filter(':checked').length,
                    len = $check.length;

                if(len !== checkNum) {
                    flag = false
                }

                $checkControl.prop('checked', flag);

            })
        }
    }
```