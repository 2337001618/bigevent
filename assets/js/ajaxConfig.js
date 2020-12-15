// 优化根路径
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    console.log(options);
    options.headers = {
        Authorization: localStorage.getItem('token'),
    };
})