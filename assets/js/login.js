$(function () {

    // console.log('ok');
    //给注册或者登录模块的链接设置点击切换事件
    $("#link_reg").on("click", function () {
        $(".login-box").hide();
        $(".reg-box").show();

    });
    $("#link_login").on("click", function () {
        $(".login-box").show();
        $(".reg-box").hide();

    });


    // 自定义表单验证
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            let pwd = $(".reg-box input[name=password]").val();

            if (pwd != value) {
                return '两次密码不一致!';
            }

        }
    });

    // 监听表单注册事件
    $("#form-reg").on("submit", function (e) {
        //阻止表单的默认提交行为
        e.preventDefault();

        let data = {
            username: $(".reg-box [name=username]").val(),
            password: $(".reg-box [name=password]").val()
        };

        // console.log(data);
        //发送post请求
        $.post('/api/reguser', data, function (res) {
            if (res.status != 0) {
                // console.log(res.message);
                layer.msg(res.message);
                //注册不成功，清空表单
                $("#form-reg")[0].reset();
            } else {
                // console.log('注册成功');
                layer.msg("注册成功");

                //模拟点击事件直接跳转到登录窗口
                $("#link_login").click();

                
            }
        });



    


    

    });


    //监听表单登录事件
    $("#form_login").submit(function(e) {

        //阻止表单的默认提交行为
        e.preventDefault();

        console.log('ok');

        //发送post请求
        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg("登录失败");

                }

                layer.msg("登录成功");
                //将登录成功得到的token字符串保存到localStorage中

                localStorage.setItem('token',res.token);
                //跳转后台主页
                location.href = '/index.html';



            }

        });

    });







});