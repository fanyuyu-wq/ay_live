// 获取评论列表数据
$.ajax({
    type: "get",
    url: "/comments",
    success: function(response) {
        // 拼接评论模板显示页面
        var html = template('commentsTpl', response);
        $('#commentsBox').html(html);
        // 拼接分页模板显示页面
        // var pageHTML = template('pageTpl', response);
        // $('#pageBox').html(pageHTML);
        // 分页插件
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
// 当审核被点击时---评论审核按钮
$('#commentsBox').on('click', '.status', function() {
    var status = parseInt($(this).attr('data-status'));
    var id = $(this).attr('data-id');
    $.ajax({
        type: "put",
        url: "/comments/" + id,
        data: {
            state: status == 0 ? 1 : 0
        },
        success: function() {
            location.reload();
        }
    });
});
// 实现删除操作
$('#commentsBox').on('click', '.delete', function() {
    if (confirm('是否确认删除')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: "delete",
            url: "/comments/" + id,
            success: function() {
                location.reload();

            }
        });
    }
})