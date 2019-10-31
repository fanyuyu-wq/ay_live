// 获取文章分类数据
$.ajax({
    type: "get",
    url: "/categories",
    success: function(response) {
        var html = template('categoryTpl', { data: response });
        $('#category').html(html);
    }
});
// 二进制文件上传
// 当管理员选择文件时触发
$('#feature').on('change', function() {
    // this.files[0]文件存储位置
    var file = this.files[0];
    console.log(file);
    // 创建formData对象实现二进制文件上传
    var formData = new FormData();
    // cover文章封面 追加文件
    formData.append('cover', file);
    // 向服务器端发送请求
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        // 不要处理data属性的对应方式
        processData: false,
        // 不要设置参数类型
        contentType: false,
        success: function(response) {
            // 把地址保存到隐藏域中
            $('#pic').attr("src", response[0].cover).show();
            $('#thumbnail').val(response[0].cover);
        }
    });
});
// 添加文章功能
$('#addForm').on('submit', function() {
    // 获取输入的内容
    var formData = $(this).serialize();
    // 发送请求，添加文章
    $.ajax({
        type: "post",
        url: "/posts",
        data: formData,
        success: function(response) {
            location.href = '/admin/posts.html'
        }
    });
    // 阻止默认提交
    return false;
});
// 获取浏览器中的ID
var id = getUrlParams('id');
console.log(id);

// 判断id是否存在
if (id != -1) {
    // 根据文章获取详细信息
    $.ajax({
        type: "get",
        url: "/posts/" + id,
        success: function(response) {
            console.log(response);

            $.ajax({
                type: "get",
                url: "/categories",
                success: function(categories) {
                    response.categories = categories;
                    var html = template('modifyTpl', response);
                    $('#parentBox').html(html);
                }
            });
        }
    });

}
//获取浏览器地址栏中的查询参数
function getUrlParams(name) {
    // location.search可以获取地址栏中的参数
    // substr(1) 从第二个可以截取 数据是一个数组
    var paramsAry = location.search.substr(1).split('&');
    // 循环数组提取所需数据 
    for (var i = 0; i < paramsAry.length; i++) {
        // 以等号进行分割
        var tmp = paramsAry[i].split('=');
        // 判断tmp的角标0存储的数据是否和传递的name数据一样
        if (tmp[0] == name) {
            // 返回值
            return tmp[1];
        }

    }
    // 如果找不到就返回-1
    return -1;
}
// 修改文章信息表单发生提交行为
$('#parentBox').on('submit', '#modifyForm', function() {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: "put",
        url: "/posts/" + id,
        data: formData,

        success: function(response) {
            location.href = '/admin/posts.html';
        }
    });
    return false;
});