$(function () {
    let form = layui.form;
    let layer = layui.layer;
    // form添加自定义校验规则
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 新旧密码不能相同
        oldPass: value => {
            console.log(value);//新密码输入框的值
            // 获取原密码的值
            let oldPwd = $('[name=oldPwd]').val();
            if (value === oldPwd) {
                return "新密码不能和原密码一致!"
            }
        },
        // 两次输入的新密码必须相同
        newPass: value => {
            let newPwd = $('[name=newPwd]').val();
            if (value !== newPwd) {
                return "两次输入的新密码不一致!"
            }
        }
    })

    // 发送ajax请求实现密码的重置功能
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        let data = $(this).serialize();
        console.log(data);
        $.ajax({
            url: '/my/updatepwd',
            type: 'POST',
            data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新密码失败' + res.message)
                }
                layer.msg("更新密码成功!");
                $('.layui-form')[0].reset();
            }
        })
    })
})