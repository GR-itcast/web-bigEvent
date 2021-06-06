$(function () {

    let layer = layui.layer;
    let form = layui.form;
    let laypage = layui.laypage;
    //定义过滤器美化时间
    template.defaults.imports.dateFormat = function (date) {

        let newDate = new Date(date);

        let y = newDate.getFullYear();
        let m = padZero(newDate.getMonth() + 1);
        let d = padZero(newDate.getDate());

        let hh = padZero(newDate.getDay());
        let mm = padZero(newDate.getMinutes());
        let ss = padZero(newDate.getSeconds());

        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;

    }


    //定义补零函数
    function padZero(d) {
        return d >= 10 ? d : '0' + d;
    }


    //定义发送请求的参数对象
    let m = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    initTable();
    initArtCate();

    //获取文章信息的方法
    function initTable() {

        $.ajax({

            method: 'GET',
            url: '/my/article/list',
            data: m,
            success: function (res) {

                if (res.status !== 0) {
                    //获取文章信息事变
                    return layer.msg("获取文章信息失败!");
                }

                //使用模板引擎渲染页面
                let htmlStr = template("tpl-tab", res);
                $(".layui-table tbody").html(htmlStr);

                //渲染分页
                renderPage(res.total);
            }



        })


    }


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


    //筛选文章分类 ajax

    $("#form-search").on("submit", function (e) {

        e.preventDefault();

        // alert(11)

        let cate_id = $("#sel").val();
        let state = $("#sel-state").val();

        m.cate_id = cate_id;
        m.state = state;


        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: m,
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg("筛选失败！");
                }
                layer.msg("筛选成功！");
                initTable();

            }



        });



    });



    //渲染分页的方法
    function renderPage(total) {

        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: m.pagesize,
            curr: m.pagenum,
            limits: [2, 3, 5, 10],
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            // jump回调函数触发有两种情况
            //1.点击页码使触发jumo函数
            //2.只要调用laypage.renderPage()该方法就会触发jump函数
            jump: function (obj, first) {
                //将新的页码值赋值狗日m对象
                m.pagenum = obj.curr;
                m.pagesize = obj.limit;

                //先判断是以什么方式触发jump函数
                if (!first) {
                    //first为undefine时是以第一种方式触发Jump函数
                    initTable();
                }



            }
        });

    }



    //给删除按钮添加事件代理
    $("tbody").on("click", ".btn-del", function () {

        //获取删除按钮的个数
        let btnLen = $(".btn-del").length;
        console.log(btnLen);
        // alert(11)
        let id = $(this).attr("data-id");

        layer.confirm('确定删除吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg("删除文章失败！");
                    }

                    layer.msg("删除文章成功！");

                    //如果删除当页文章只有一个，则删除后将页面pageNum 减1
                    if (btnLen == 1) {
                        m.pagenum = m.pagenum == 1 ? 1 : m.pagenum - 1;
                    }

                    //重新渲染table
                    initTable();

                }

            })

            layer.close(index);
        });







    })



    // 编辑文章按钮的点击事件处理函数
   /*  $('tbody').on('click', '.btn-edit', function () {
        // 获取要编辑的文章的 id
        const id = $(this).attr('data-id')
        // 跳转到文章编辑页面
        location.href = '/article/art_pub.html?id='+id
    }) */



})