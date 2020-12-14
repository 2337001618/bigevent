$(function () {
    $('#goToRegi').click(function () {
        $('.register').show();
        $('.login').hide();
    })
    $('#goToLogin').click(function () {
        $('.register').hide();
        $('.login').show();
    })
    let form = layui.form;
    let layer = layui.layer;//弹框功能
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        , pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // repass: function (value, item) {
        //     console.log(value);
        //     console.log($('.passIpt').val());
        //     if (value !== $('.passIpt').val()) {
        //         return '两次输入的密码不一致'
        //     }
        // }
        repass: function (value) {
            if (value !== $('.passIpt').val()) {
                return '两次输入的密码不一致'
            }
        }
    });

    // 实现注册功能
    $('#regiForm').on('submit', function (e) {
        e.preventDefault();
        let data = $(this).serialize();
        // console.log(data);
        $.ajax({
            type: "POST",
            url: '/api/reguser',
            data,
            success: function (res) {
                console.log(res);//lyy1204  123456  t12345 123456 t12345678 12345678
                if (res.status !== 0) {
                    // return console.log(res.message);
                    return layer.msg(res.message);
                }
                // console.log("注册成功");
                layer.msg("注册成功");

                // 清空注册的form表单
                $('#regiForm')[0].reset();
                $('#goToLogin').click();

            }
        })
    })

    // 登录功能
    $('#loginForm').on('submit', function (e) {
        e.preventDefault();
        let data = $(this).serialize();
        // console.log(data);
        $.ajax({
            type: "POST",
            url: '/api/login',
            data,
            success: function (res) {
                console.log(res);//lyy1204  123456  t12345 123456 t12345678 12345678
                if (res.status !== 0) {
                    // return console.log(res.message);
                    return layer.msg(res.message);
                }
                // console.log("注册成功");
                // layer.msg("登录成功,即将跳转到首页");

                // 跳转到首页
                // location.href = "/home/index.html"

                // 把token存储在本地中
                localStorage.setItem('token', res.token);

                layer.msg('登录成功,即将跳转到首页', {
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                    location.href = "/home/index.html"
                });
            }
        })
    })
})