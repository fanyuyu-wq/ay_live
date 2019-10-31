$.ajax({
    type: "get",
    url: "/posts",
    success: function(response) {
        console.log(response);

        var html = template('postsTpl', response);
        $('#postsBox').html(html);
        var page = template('pageTpl', response);
        $('#page').html(page);
        // $('.pagination').twbsPagination({
        //     totalPages: response.pages, //总页数
        //     visiblePages: 5, //显示按钮个数
        //     first: '首页',
        //     prev: '上一页',
        //     next: '下一页',
        //     last: '尾页',
        //     onPageClick: function(event, page) {
        //         changePage(page)
        //     }
        // });
    }
});

// 文章分类数据 分类下拉框
$.ajax({
    type: "get",
    url: "/categories",
    success: function(response) {
        var html = template('categoryTpl', { data: response });
        $('#categoryBox').html(html);

    }
});
// 筛选功能
$('#filterForm').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
        type: "get",
        url: "/posts",
        data: formData,
        success: function(response) {
            console.log(response);
            var html = template('postsTpl', response);
            $('#postsBox').html(html);
            var page = template('pageTpl', response);
            $('#page').html(page);
            // $('.pagination').twbsPagination({
            //     totalPages: 1, //总页数
            //     visiblePages: 3, //显示按钮个数
            //     first: '首页',
            //     prev: '上一页',
            //     next: '下一页',
            //     last: '尾页',
            //     onPageClick: function(event, page) {
            //         changePage(page)

            //     }
            // });
        }
    });
    return false;
});
// 分页功能
function changePage(page) {
    $.ajax({
        type: "get",
        url: "/posts",
        data: {
            page: page
        },
        success: function(response) {
            console.log(response);

            var html = template('postsTpl', response);
            $('#postsBox').html(html);
            var page = template('pageTpl', response);
            $('#page').html(page);
        }
    });

}
// 删除功能
$('#postsBox').on('click', '.delete', function() {
    if (confirm('是否确定删除?')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: "delete",
            url: "/posts/" + id,

            success: function(response) {
                location.reload();
            }
        });
    }


});