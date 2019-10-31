//添加分类功能
$('#addCategory').on('submit', function() {
    // 获取到用户输入的表单内容
    var formData = $(this).serialize();
    // 向服务器端发送添加分类请求
    $.ajax({
        type: "post",
        url: "/categories",
        data: formData,
        success: function() {
            location.reload();
        }
    });
    // 阻止表单默认提交行为
    return false;


});


//展示分类功能
$.ajax({
    type: "get",
    url: "/categories",
    success: function(response) {
        // 数据和模板进行拼接、
        var html = template('categoryListTpl', {
            data: response
        });
        $('#categoryBox').html(html);
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
// 实现分页
function changePage(page) {
    $.ajax({
        type: "get",
        url: "/comments",
        data: {
            page: page
        },
        success: function(response) {
            var html = template('commentsTpl', response);
            $('#commentsBox').html(html);
            // var pageHTML = template('pageTpl', response);
            // $('#pageBox').html(pageHTML);
        }
    });

}


//修改分类功能
//展示列表信息
$('#categoryBox').on('click', '.edit', function() {
    // 获取id
    var id = $(this).attr('data-id');
    // 请求服务器端传输列表数据
    $.ajax({
        type: "get",
        url: "/categories/" + id,
        success: function(response) {
            // 拼接模板
            var html = template('modifyCategoryTpl', response);
            // 渲染页面
            $('#formBox').html(html);
        }
    });
});

//进行列表信息修改
//委托父级进行事件提交
$('#formBox').on('submit', '#modifyCategory', function() {
    var formData = $(this).serialize();
    console.log(formData);

    var id = $(this).attr('data-id');
    $.ajax({
        type: "put",
        url: "/categories/" + id,
        data: formData,
        success: function(response) {
            location.reload();
        }

    });
    return false;
});
// 删除功能
//删除单条
$('#categoryBox').on('click', '.delete', function() {

    if (confirm('确定删除？')) {
        var id = $(this).attr('data-id');
        console.log(id);

        $.ajax({
            type: "delete",
            url: "/categories/" + id,
            success: function() {
                location.reload();

            }
        });
    }
});
// 全选按钮
var allCheck = $('#allCheck');
// 选中全选显示批量删除按钮
allCheck.on('click', function() {
    var status = $(this).prop('checked');
    console.log(status);

    if (status) {
        $('#deleteMany').show();
    } else {
        $('#deleteMany').hide();
    }
    $('#categoryBox').find('input').prop('checked', status);
});
// 选中单个按钮显示批量删除按钮，单个按钮全部选中，全选按钮也选中
$('#categoryBox').on('change', '#categoryList', function() {
    var inputs = $('#categoryBox').find('input');

    if (inputs.length == inputs.filter(':checked').length) {

        allCheck.prop('checked', true);
    } else {
        allCheck.prop('checked', false);
    }
    if (inputs.filter(':checked').length > 0) {
        $('#deleteMany').show();
    } else {
        $('#deleteMany').hide();
    }


});
// 批量删除
$('#deleteMany').on('click', function() {
    var ids = [];
    var checkedList = $('#categoryBox').find('input').filter(':checked');
    console.log(checkedList);
    checkedList.each(function(index, element) {
        ids.push($(element).attr('data-id'));
        if (confirm('确定执行本操作？')) {
            $.ajax({
                type: "delete",
                url: "/categories/" + ids.join('-'),
                success: function() {
                    location.reload();
                }
            });
        }


    })

})