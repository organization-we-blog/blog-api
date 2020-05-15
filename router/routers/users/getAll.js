const UserModel = require("../../../mongo/models/users")
const ErrLogModel = require("../../../mongo/models/err_logs")

module.exports = async function (req,res) {
    try {
        let userList = await UserModel.find({},{password: false})
        res.json({code: 200, mas: "获取成功", datas: userList, token: req.tokenObj.token})
    }catch (e) {
        ErrLogModel.addErrLog(req,e,__filename);
        res.json({code: 500, mas: "服务器繁忙", datas: []})
    }
}
