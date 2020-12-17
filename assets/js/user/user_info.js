$(function () {
    let form = layui.form;
    let layer = layui.layer;
    getUserInfo();
    function getUserInfo() {
        $.ajax({
            url: "/my/userinfo",
            success: function (res) {
                console.log(res);
                // 给表单赋值
                form.val("form", res.data);
            }
        })
    }

    $('#resetBtn').click(function (e) {
        e.preventDefault();
        getUserInfo();
    })
    // 实现表单提交功能
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        let data = $(this).serialize();
        console.log(data);
        // return;
        $.ajax({
            url: "/my/userinfo",
            type: "POST",
            data,
            success: function (res) {
                console.log(res);
                // 提交修改的弹框
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败!')
                }
                layer.msg('修改用户信息成功!');
                // 更新index页面左侧导航的名字
                window.parent.getUserInfo();
            }
        })
    })

})