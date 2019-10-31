// 用户模块
const { User } = require('../../../model/User');
// 分页
const pagination = require('mongoose-sex-page');
// 工具
const _ = require('lodash');
module.exports = async(req, res) => {
    // 当前页
    let page = req.query.page || 1;
    // 查询用户信息
    // const users = await User.find().select('-password').sort('-createTime');
    const users = await pagination(User).page(page).size(3).display(5).find().populate('-password').select('-password').sort('-createTime').exec();

    // 响应
    res.send(users);
}