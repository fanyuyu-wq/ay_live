// 退出功能
$('#logout').on('click', function() {
    //和用户进行确认是否退出confirm会弹出一个确认框
    var isConfirm = confirm('您确定要退出吗？');
    //判断是否确认退出
    if (isConfirm) {
        //确认就向后端发送数据
        $.ajax({
            type: "POST",
            url: "/logout",
            success: function(response) {
                location.href = 'login.html';
            },
            error: function(response) {
                alert('退出失败，请刷新后重试');
            }
        });
    }
})

// 格式化日期
function formateDate(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

}
// 获取用户信息
$.ajax({
    type: "get",
    url: "/users/" + userId,
    success: function(response) {
        $('.avatar').attr('src', response.avatar);
        $('.profile .name').html(response.nickName);
    }
});