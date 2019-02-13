const mongoose = require('mongoose')
var Schema = mongoose.Schema

var articleSchema = new Schema({
    title: String,
    category: String,
    briefDesc: String,
    content: String,
    image: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    tag: [String]
}, {
    timestamps: true
})


var Article = mongoose.model('Article', articleSchema)

module.exports = Article