const monogoose = require("mongoose");

let id1 = monogoose.Types.ObjectId();
let id2 = "5e9fe2e9ae4ec40d482db55c";
let id3 = "5e9fe2e9ae4e40d482db55c";
let id4 = ["5e9fe2e9ae4ec40d482db55c"];

let {isObjectId} = require("../../../util/TypeVerift")
module.exports = function (req, res) {
    console.log(isObjectId(id1));
    console.log(isObjectId(id2));
    console.log(isObjectId(id3));
    console.log(isObjectId(id4));
};
