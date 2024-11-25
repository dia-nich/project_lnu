let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let postSchema = new Schema({
    author: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
},
});

let postModel = mongoose.model("postModel", postSchema);

module.exports = postModel;