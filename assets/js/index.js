// 发送ajax请求来获取用户头像和昵称
getUserInfo();
let layer = layui.layer;
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token'),
        // },
        success: function (res) {
            console.log(res);

            // 失败判断
            if (res.status !== 0) {
                // return console.log('获取用户信息失败');
                return layer.msg('获取用户信息失败');
            }
            // 处理优先级
            let name = res.data.nickname || res.data.username;
            $('#welcome').text('欢迎 ' + name);
            // 头像 2选1
            if (res.data.user_pic) {
                $('.textAvatar').hide();
                $('.layui-nav-img').attr('src', res.data.user_pic).show();
            } else {
                $('.textAvatar').show().text(name[0].toUpperCase());
                $('.layui-nav-img').hide();
            }

        },
        complete: function (res) {
            let data = res.responseJSON;
            if (data.status === 1 && data.message === '身份认证失败！') {
                // alert('滚');
                location.href = '/home/login.html';
                localStorage.removeItem('token');

            }
        }
    })
}
// 实现退出功能
$('#logoutBtn').click(function () {
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
        // alert('点击的确认')
        // 退出需要做的事情和登录的时候正好相反
        localStorage.removeItem('token');
        location.href = '/home/login.html';
        layer.close(index);
    });
})