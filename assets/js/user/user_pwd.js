$(function () {

    let form = layui.form;
    let layer = layui.layer;

    form.verify({
        //定义密码的校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],

        //定义两次密码不能一直的校验规则
        samePwd: function (value) {

            if (value === $("[name=oldPwd]").val()) {
                return '两次密码不能一致！'
            }

        },

        repwd: function (value) {
            if (value !== $("[name=newPwd]").val()) {
                return '确认密码要与新密码保持一致！'
            }
        }


    });


    //给表单绑定submit事件
    $(".layui-form").on("submit", function (e) {
        //阻止表单默认提交行为
        e.preventDefault();

        // console.log($(this).serialize());

        layer.confirm('确定修改密码吗？', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something

            //发送ajax请求
            $.ajax({

                type: 'POST',
                url: '/my/updatepwd',
                data: $(".layui-form").serialize(),
                success: function (res) {
                    // console.log(res);

                    if (res.status !== 0) {
                        //提交失败
                        return layer.msg("重置密码失败！");
                    }
                    layer.msg("重置密码成功！")
                    $(".layui-form")[0].reset();
                }


            });


            layer.close(index);
        });



    });


})