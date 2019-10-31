//获取登录按钮，绑定点击事件
$('#loginBtn').on('click', function() {
    //获取用户输入的邮箱和密码的值
    var email = $('#email').val();
    var password = $('#password').val();
    console.log(email);

    //判断用户是否输入邮箱和密码数据
    //trim()去除两边的空格.中间的空格不能去掉
    if (email.trim().length == 0) {
        $('#msg').text('请输入邮箱');
        $('.alert').show();
        return;

    }
    if (password.trim().length == 0) {
        $('#msg').text('请输入密码');
        $('.alert').show();
        return;

    }
    //向服务端发送请求
    $.ajax({
        type: "post",
        url: "/login",
        data: {
            email: email,
            password: password
        },

        success: function(response) {
            //判断用户输入的角色
            console.log(response.role);


            if (response.role == 'admin') {
                //是管理员就重定向到管理页面
                location.href = '/admin/index.html';

            } else {
                //请求成功后，重定向页面到数据管理的首页
                location.href = '../index.html';
            }

        },
        error: function() {
            $('#msg').text('登录失败');
            $('.alert').show();

        }
    });


})