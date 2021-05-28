$.ajaxPrefilter(function (options) {

    //每次发送ajax请求时都会监听发送的请求

    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;

    console.log(options.url);


});