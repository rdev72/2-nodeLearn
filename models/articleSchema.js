const mongoose = require ('mongoose')
const articleSchema = mongoose.Schema ({
    title : {type: String, required:true},
    auther : {type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},         //special Type: mongoose Schema Type -objectID, of user of userSchema
    description : {type: String, required:true},
    comment:[{type:mongoose.Schema.Types.ObjectId, ref:'comment', required:true}]
})
module.exports = mongoose.model('article',articleSchema)