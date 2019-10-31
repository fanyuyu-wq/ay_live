// 验证模块
const Joi = require('joi');
// 用户模块
const { Setting, validateSettings } = require('../../../model/Setting');
// 工具
const _ = require('lodash');

module.exports = async(req, res) => {
    // 要修改的网站id
    const id = req.params.id;
    const body = req.params;
    console.log(body);

    console.log(id);
    // 定义对象验证规则
    const schema = {
        _id: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('网站id非法'))
    };

    // // 数据格式没有通过验证
    // if (error) return res.status(400).send({ message: error.message });
    // 通过验证
    // 更新用户信息
    // new: true 返回修改后的文档 默认值为false 返回原始文档
    // fields: '-password'} 从返回值中抛除密码字段
    let setting = await Setting.findByIdAndUpdate(req.params._id, { $set: req.params }, { new: true });
    // 响应
    console.log(setting);

    res.send(setting);
};