// 获取地址栏的ID值
var postId = getUrlParams('id');
// 评论是否经过人工审核
var review;
// 获取文章详细信息
$.ajax({
    type: "get",
    url: "/posts/" + postId,
    success: function(response) {
        var html = template('postTpl', response);
        $('#article').html(html);
    }
});
// 实现点赞按钮
$('#article').on('click', '#like', function() {
    // 执行点赞操作
    $.ajax({
        type: "post",
        url: "/posts/fabulous/" + postId,
        success: function(response) {
            alert('点赞成功');

        }
    });
})


// 获取网站的配置信息
$.ajax({
    type: 'get',
    url: '/settings',
    success: function(response) {
        review = response.review
        console.log(review);

        // 判断管理员是否开启的评论功能
        if (response.comment) {
            // 管理员开启了评论功能 渲染评论模板
            var html = template('commentTpl');
            // 渲染评论模板
            $('#comment').html(html);
        }
    }
});
// 实现评论功能
$('#comment').on('submit', 'form', function() {
    var content = $(this).find('textarea').val();
    console.log(content);
    var state;

    if (review) {
        state = 0;

    } else {
        state = 1;
    }
    $.ajax({
        type: "post",
        url: "/comments",
        data: {
            content: content,
            post: postId,
            state: state
        },
        success: function(response) {
            alert('评论成功');
            location.reload();
        },
        error: function(response) {
            alert('评论失败');
        }

    });

    return false;
})