$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    let $image = $('#image')
    let layer = layui.layer;
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options);

    // 点击上传按钮
    $('#chooseBtn').click(function () {
        $('[type=file]').click();
    })
    // 给文件域注册点击事件change
    $('#file').change(function () {
        console.log("文件域发生改变了");
        // 获取到我们选择的图片,通过文本域DOM对象
        let file = this.files[0];
        // 把选择的图片处理成url地址
        var newImgURL = URL.createObjectURL(file)

        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)// 重新初始化裁剪区域
    })
    // 给确认按钮注册click,并且发送ajax请求
    $('#sureBtn').click(function () {
        let dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            url: "/my/update/avatar",
            type: "POST",
            data: {
                avatar: dataURL,
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("更新头像失败!")
                }
                layer.msg("更新头像成功!")
                // 通过调用来获取最新的头像和昵称
                window.parent.getUserInfo();
            }
        })
    })
})