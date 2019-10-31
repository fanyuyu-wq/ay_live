// 二进制文件上传
$('#file').on('change', function() {
    var file = this.files[0];
    var formData = new FormData();
    formData.append('image', file);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
            $('#pic').attr("src", response[0].image).show();
            $('#image').val(response[0].image);

        }
    });
});
//添加图片轮播功能
$('#slidesForm').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/slides",
        data: formData,
        success: function() {
            location.reload();
        }
    });
    return false;
})

// 编辑修改
$.ajax({
    type: "get",
    url: "/slides",
    success: function(response) {
        console.log(response);

        var html = template('slidesTpl', { data: response })
        $('#slidesBox').html(html);
    }
});
$('#slidesBox').on('click', '.delete', function() {
    if (confirm('是否删除？')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: "delete",
            url: "/slides/" + id,

            success: function() {
                location.reload();
            }
        });
    }
})