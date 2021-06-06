$(function () {

    let layer = layui.layer;


    getArtinfo();


    //获取文章信息
    function getArtinfo() {
        //发送ajax请求获取文章信息
        $.ajax({

            type: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);

                if (res.status === 0) {

                    //使用模板引擎渲染出表格样式
                    let artStr = template("tel-art", res)

                    $("#tb-art").html(artStr);


                }
            }


        });
    }


    let addIndex = null;

    //添加类别按钮绑定点击事件
    $("#addCate").on("click", function () {
        addIndex = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['550px', '250px'],
            content: $("#dialog-add").html()
        });

    });


    //为确认添加按钮绑定点击事件
    //事件代理方法，绑定事件，这样即使没有改页面结构也会绑定事件
    $("body").on("submit", "#form-add", function (e) {
        e.preventDefault();
        // alert(11)

        //发送ajax请求添加分类信息
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {

                if (res.status !== 0) {
                    //添加图书分类失败
                    layui.layer.msg("添加图书分类失败!");
                }

                //添加成功
                //重新渲染页面
                getArtinfo();
                layui.layer.msg("添加图书分类成功!");
                //关闭弹出层
                layui.layer.close(addIndex);
            }


        });

    });


    let editIndex = null;
    //采用事件代理的方法绑定事件
    $("body").on("click", ".btn-edit", function () {
        // alert(11)

        editIndex = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['550px', '250px'],
            content: $("#dialog-edit").html()
        });


        //获取文章的id
        let id = $(this).parent().siblings("#td-id").html();
        // console.log(id);
        //发送ajax请求获取当前文章的信息
        $.ajax({

            type: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                // console.log(res);

                layui.form.val("form-edit", res.data);


            }


        });


    })


    //给确认添加按钮绑定事件代理
    $("body").on("submit", "#form-edit", function (e) {
        e.preventDefault();
        // alert(11)


        //发送ajax请求修改文章信息
        $.ajax({

            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);

                if (res.status !== 0) {
                    return layui.layer.msg("修改文章信息失败!");
                }

                //关闭弹出层
                layer.close(editIndex);

                //提示修改成成功
                layer.msg("修改成功");

                //修改成功，重新渲染页面
                getArtinfo();

            }
        })




    });


    //根据id 删除文章信息
    $("body").on("click", ".btn-del", function () {

        //获取文章的id
        let id = $(this).parent().siblings("#td-id").html();

        // console.log(id);

        layer.confirm('确定删除吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something


            //发送ajax请求删除文章信息
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    // console.log(res);

                    if (res.status !== 0) {
                        return layer.msg("删除失败！");
                    }

                    //删除成功
                    layer.msg("删除成功");
                    //重新渲染页面
                    getArtinfo();

                }
            })


            layer.close(index);
        });

    })





})