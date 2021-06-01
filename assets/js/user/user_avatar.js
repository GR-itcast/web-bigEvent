$(function () {


    let layer = layui.layer;

    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    //给上传按钮绑定点击事件
    $("#btn").on("click", function () {

        //点击上传之后 触发文件上传input框
        $("#file").click();


    });

    //  给file表单绑定change事件
    $("#file").on("change", function (e) {

        // let file = $(this)[0].files[0];
        let file = e.target.files[0];

        //获取文件地址
        let newImgURL = URL.createObjectURL(file);

        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    });


    //给确定按钮绑定点击事件
    $("#btn-sure").on("click", function () {

        //将截图好的图片装换成base64格式的图片文件
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

            layer.confirm('确定更改头像吗?', {icon: 3, title:'提示'}, function(index){
                
                //发送ajax请求上传文件
                $.ajax({

                    type: 'POST',
                    url: '/my/update/avatar',
                    data: {
                        avatar: dataURL
                    },
                    success: function(res) {
                        if(res.status !== 0) {
                            //上传头像失败
                            return layer.msg("上传头像失败!");
                        }
                        //重新渲染主页面
                        window.parent.getUserMSG();
                    }


                });

                
                layer.close(index);
              });


    });

})