const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const user = new Schema({//
    username: {type: String},
    password: {type: String},
    head_portrait: {type: String, default: "无"},
    email: {type: String, default: "无"}
});

let users = mongoose.model('users', user);

module.exports = async function (req, res) {
    await users.find({},function (err,docs) {
        res.json({docs});
    });
};
