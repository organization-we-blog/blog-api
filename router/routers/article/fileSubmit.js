
module.exports = async function(req,res){
    res.send({result: {filepath: "/uploads/" + req.file.filename}, msg: "ok", status_code: 200})
};
