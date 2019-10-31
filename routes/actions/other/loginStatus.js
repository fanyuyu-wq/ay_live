module.exports = async(req, res) => {
    console.log(req.session.userInfo);

    if (req.session && req.session.userInfo && req.session.userInfo.role == 'admin') {
        const s = `var isLogin = true; var userId=\"${req.session.userInfo._id}\"`
        res.send(s)
    } else {
        res.send('var isLogin = false')
    }
};