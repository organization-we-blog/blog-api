const token = require("../../../util/token")
module.exports = async function (req, res) {
    let tokenObj = await token.verify(req.headers.token)
    if(tokenObj){
        //res.setHeader("Access-Control-Expose-Headers", "token");
        res.setHeader("token", tokenObj.token)
        res.json({msg: "hhhhhh"})
    }else {
        res.json({msg: "wwwwww"})
    }

};
