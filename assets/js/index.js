$(function() {


    // console.log('ok');

    getUserMSG();


    //给退出按钮绑定事件
    $("#exit").on("click",function() {

        // console.log('ok');
        layer.confirm('确定退出吗?', {icon: 3, title:'提示'}, function(index){
            
            //1.删除localStorage的token值
            localStorage.removeItem('token');
            //2.跳转到登录页面
            location.href = '/login.html';            


            layer.close(index);
          });

    });

});

//获取用户信息的方法
function getUserMSG() {
    $.ajax({

        type: 'GET',
        url: '/my/userinfo',
       /*  headers: {
            Authorization: localStorage.getItem('token') || ''
        }, */

        success: function(res) {
            //获取用户信息失败
            if(res.status !== 0) {
                return layui.layer.msg("获取用户信息失败");
            }
            // console.log(res);
            renderAvatar(res.data);
        },

        //无论发送请求是否成功都会调用该函数
        /* complete: function(res) {
            console.log(res);
            if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                //代表登录失败

                //1.清空token值
                localStorage.removeItem('token');
                //2.跳转login页面
                location.href = '../login.html';

                
            }

        } */


    });

}


// 渲染用户的头像
function renderAvatar(user) {       

    let name = user.nickname || user.username;

    $("#wel").html('欢迎&nbsp;'+name);

    //判断用户有没有头像
    if(user.user_pic){
        //有图片头像则渲染图片头像
        $(".layui-nav-img").show().prop("src",user.user_pic);
        $(".user-avatar").hide();
    }else {
        let first = name.substr(0,1).toUpperCase();

        //没有图片头像
        $(".layui-nav-img").hide();
        $(".user-avatar").html(first);
    }




}

