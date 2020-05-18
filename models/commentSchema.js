const mongoose = require ('mongoose')
const commentSchema = mongoose.Schema ({
    comment : {type: String, required:true},
    auther : {type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},         //special Type: mongoose Schema Type -objectID, of user of userSchema
    article : {type:mongoose.Schema.Types.ObjectId, ref:'article', required:true}, 
    //     time: timestamp
})
module.exports = mongoose.model('comment',commentSchema)