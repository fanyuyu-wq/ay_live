// 随机推荐数据
$.ajax({
    type: "get",
    url: "/posts/random",
    success: function(response) {
        // 随机推荐数据会用到很多地方所以直接写到js中做成公共的
        var randomTpl = `
        {{each data}}
        <li>
        <a href="detail.html?id={{$value._id}}">
            <p class="title">{{$value.title}}</p>
            <p class="reading">阅读({{$value.meta.views}})</p>
            <div class="pic">
                <img src="{{$value.thumbnail}}" alt="">
            </div>
        </a>
    </li>
       {{/each}}
        `;
        var html = template.render(randomTpl, { data: response })
        $('#randomBox').html(html);
    }
});
// 最新评论
$.ajax({
    type: "get",
    url: "/comments/lasted",
    success: function(response) {

        var commentTpl = ` 
            {{each data}}
            <li>
            <a href="javascript:;">
                <div class="avatar">
                    <img src="{{$value.author.avatar}}" alt="">
                </div>
                <div class="txt">
                    <p>
                        <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}
                    </p>
                    <p>{{$value.content}}</p>
                </div>
            </a>
            </li>
            {{/each}}
            `;
        var html = template.render(commentTpl, { data: response });
        $('#commentBox').html(html);
    }

});


// 文章分类列表数据
$.ajax({
    type: "get",
    url: "/categories",
    success: function(response) {
        var navTpl = `
        {{each data}}
        <li>
            <a href="list.html?categoryId={{$value._id}}">
                <i class="fa {{$value.className}}">
                </i>{{$value.title}}
            </a>
        </li>
        {{/each}}
        `;
        var html = template.render(navTpl, { data: response });
        $('#navBox').html(html);
        $('#topNavBox').html(html);
    }
});
// 获取地址栏中的ID值
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }

    }
    return -1;
}
// 获取搜索表单
$('.search form').on('submit', function() {
    // 获取用户在表单中输入的关键字
    var keys = $(this).find('.keys').val();
    // 跳转搜素结果页面
    location.href = "/search.html?key=" + keys;
    return false;
})

// 格式化日期
function formateDate(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

}