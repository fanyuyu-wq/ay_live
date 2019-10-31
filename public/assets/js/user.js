// 用户添加功能
// 给表单添加提交事件
$('#userForm').on('submit', function() {
    // 获取到用户在表单中输入的内容并将内容格式转换为参数字符串
    var formData = $(this).serialize();
    console.log(formData);
    //向服务器发送添加用户请求
    $.ajax({
        type: "post",
        url: "/users",
        data: formData,
        success: function() {
            // 刷新页面
            location.reload();
        },
        error: function() {
            alert('添加失败');

        }
    });
    // 阻止表单默认提交行为
    return false;
});


//用户头像上传功能
$('#modifyBox').on('change', '#avatar', function() {
    //实现二进制文件上传FormData
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        //告诉$.ajax方法不要解析请求参数
        processData: false,
        //告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function(response) {
            //实现头像预览功能
            //调用attr方法设置图像地址
            $('#preview').attr('src', response[0].avatar);
            //设置隐藏域的值
            $('#hiddenAvatar').val(response[0].avatar);
        }
    });

})


//发送数据索要用户信息，并渲染到页面
$.ajax({
    type: "get",
    url: "/users",
    success: function(response) {
        console.log(response);
        var html = template('userTpl', response);
        $('#userBox').html(html);
        // var page = template('pageTpl', response);
        // $('#page').html(page);
        $('.pagination').twbsPagination({
            totalPages: response.pages, //总页数
            visiblePages: 5, //显示按钮个数
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '尾页',
            onPageClick: function(event, page) {
                changePage(page)
            }
        });


    }
});
// changePage(5);
// 分页功能

function changePage(page) {
    $.ajax({
        type: "get",
        url: "/users",
        data: {
            page: page
        },
        success: function(response) {
            console.log(response);

            var html = template('userTpl', response);
            $('#userBox').html(html);
            // var page = template('pageTpl', response);
            // $('#page').html(page);
        }
    });

}
//用户信息修改---把用户信息显示在修改页面上
//给编辑按钮添加点击事件
$('#userBox').on('click', '.edit', function() {
    //利用自定义属性获取被点击用户的id
    var id = $(this).attr('data-id');
    $.ajax({
        type: "get",
        url: "/users/" + id,
        success: function(response) {
            //获取到拼接好的模板
            var html = template('modifyTpl', response);
            //渲染到页面中
            $('#modifyBox').html(html);

        }
    });
})

//进行用户信息修改
//事件提交
$('#modifyBox').on('submit', '#modifyForm', function() {
    // 获取到用户在表单中输入的内容并将内容格式转换为参数字符串
    var formData = $(this).serialize();
    // 获取要修改的而用户id值
    var id = $(this).attr('data-id');
    //发送请求 传递修改后的用户信息
    $.ajax({
        type: "put",
        url: "/users/" + id,
        data: formData,
        success: function(response) {
            //传递成功，重新加载页面
            location.reload();
        }
    });
    return false;
})

//删除单条信息的功能
$('#userBox').on('click', '.delete', function() {
    //确认是否删除用户
    if (confirm('您要删除用户吗？')) {
        //获取到id
        var id = $(this).attr('data-id');
        console.log(id);

        //向服务器端发送删除请求
        $.ajax({
            type: "delete",
            url: "/users/" + id,
            success: function(response) {
                // 刷新页面
                location.reload();
            }
        });
    }
});


// 批量删除功能
// 获取全选按钮
var selectAll = $('#selectAll');
// 获取批量删除按钮
var deleteMany = $('#deleteMany');
// 给全选按钮绑定状态事件，监听状态的变化
selectAll.on('change', function() {
        // 获取当前的状态
        var status = $(this).prop('checked');
        // console.log(status);
        // 判断状态
        if (status) {
            // 显示批量删除标签
            deleteMany.show();
        } else {
            // 隐藏批量删除按钮
            deleteMany.hide();
        }
        // 获取到所有的用户 设置用户的选中状态
        $('#userBox').find('input').prop('checked', status);
    })
    // 当用户前面的复选框状态改变时，
$('#userBox').on('change', '.userStatus', function() {
        // 获取到所有用户，过滤出选中状态的
        var inputs = $('#userBox').find('input');

        // 判断用户数量和选中用户的数量是否一样
        // inputs.filter(':checked') 这是在所有用户中过滤出用户选中状态
        if (inputs.length == inputs.filter(':checked').length) {
            // 给全选按钮添加选中状态
            selectAll.prop('checked', true);
        } else {
            // 不给全选按钮添加选中状态
            selectAll.prop('checked', false);

        }
        // 判断选中的复选框数量是否大于0
        if (inputs.filter(':checked').length > 0) {
            // 显示批量删除标签
            deleteMany.show();
        } else {
            // 隐藏批量删除按钮
            deleteMany.hide();
        }
    })
    // 给批量删除添加点击事件
deleteMany.on('click', function() {
    // 准备一个空数组
    var ids = [];
    // 获取选中的用户
    var checkedUser = $('#userBox').find('input').filter(':checked');
    // 循环复选框，从复选框元素身上获取ID值
    checkedUser.each(function(index, element) {
        ids.push($(element).attr('data-id'));
    });
    if (confirm('您确定要批量删除吗？')) {
        $.ajax({
            type: "delete",
            url: "/users/" + ids.join('-'),
            success: function(response) {
                location.reload();
            }
        });
    }
});