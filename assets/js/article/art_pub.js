$(function () {

    let layer = layui.layer;
    let form = layui.form;

    initArtCate();
    initEditor();
    // 定义获取文章分类的方法
    function initArtCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);

                if (res.status !== 0) {
                    layer.msg("获取文章种类信息失败！")
                }

                //成功
                //调用模板应渲染表单
                let htmlStr = template("tpl-cate", res);

                $("#sel").html(htmlStr);
                form.render();

            }



        });


    }

    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options);




    //给选择封面按钮绑定事件
    $("#btn-file").on("click", function () {
        $("#ipt-file").click();
    })

    $("#ipt-file").on("change", function (e) {
        //获取文件
        let file = e.target.files[0];
        // console.log(file);
        let newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })


    let art_state = "已发布";

    //给存为草稿按钮绑定事件
    $("#btn-demo").on("click", function () {
        //只要用户一点击就改变art_state的值
        art_state = "草稿";
    })



    //发布文章 ajax
    $("#form-push").on("submit", function (e) {
        e.preventDefault();
        // alert(1)
        let fd = new FormData($(this)[0]);
        fd.append("state", art_state);




        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作

                fd.append("cover_img", blob);

                publishArticle(fd);
            })


        /* formData.forEach((v, k) => {
            console.log(k + ":" + v);
        }); */

    });


    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                // console.log(res);

                if (res.status !== 0) {
                    layer.msg("发表文章信息失败");
                }

                //发表成功
                layer.msg("发表成功!");

                setTimeout(function () {

                    location.href = '/article/art_list.html';
                }, 500);
            }

        });
    }



})