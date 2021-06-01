$(function () {
    // console.log('ok');

    // 自定义表单验证规则
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "用户的昵称必须是1~6个字符";
            }
        }
    });

    initUserinfo();


    //获取用户信息的方法
    function initUserinfo() {
        $.ajax({

            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    // 获取用户信息失败
                    return layer.msg("获取用户信息失败");
                }

                form.val("formUserInfo", res.data)

            }
        });
    }


    //重置表单事件
    $("#btnReset").on("click", function (e) {
        e.preventDefault();
        // console.log('ok');

        //调用获取用户信息的方法
        initUserinfo();

    });


    //给表单绑定submit事件
    $(".layui-form").on("submit", function (e) {
        e.preventDefault();

        layer.confirm('确实要修改信息吗？', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            $.ajax({
                type: 'POST',
                url: '/my/userinfo',
                data: $(".layui-form").serialize(),
                success: function (res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        //更新用户信息失败
                        return layer.msg("更新用户信息失败！");
                    }

                    //更新用户信息成功
                    //调用父页面的方法
                    window.parent.getUserMSG();
                }


            });



            layer.close(index);
        });



    });

});