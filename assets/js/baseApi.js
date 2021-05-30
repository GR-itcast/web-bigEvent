$.ajaxPrefilter(function (options) {

    //每次发送ajax请求时都会监听发送的请求

    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;

    // console.log(options.url);

    //判断请求路径是否是有权限的请求路径
    if (options.url.indexOf('/my')) {
        //添加headers属性
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        };

        options.complete = function (res) {
            console.log(res);
            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                //代表登录失败

                //1.清空token值
                localStorage.removeItem('token');
                //2.跳转login页面
                location.href = '../login.html';
                
            }


        }
    }
});