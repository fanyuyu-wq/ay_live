// 修改密码功能
$('#modifyForm').on('submit', function() {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();

    // 发送修改密码的请求
    $.ajax({
        type: "put",
        url: "/users/password",
        data: formData,
        success: function(response) {
            location.href = '/admin/login.html';
        }
    });
    // 阻止表单默认提交行为
    return false;
})