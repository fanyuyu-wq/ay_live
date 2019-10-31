// 获取地址栏中的ID值
var categoryId = getUrlParams('categoryId');
// 获取文章列表
$.ajax({
    type: "get",
    url: "/posts/category/" + categoryId,
    success: function(response) {
        console.log(response);

        var html = template('listTpl', { data: response });
        $('#listBox').html(html);
    }
});
// 根据id获取分类信息。在分类中没有内容时，使用
$.ajax({
    type: 'get',
    url: '/categories/' + categoryId,
    success: function(response) {
        $('#categoryTitle').html(response.title)
    }
})