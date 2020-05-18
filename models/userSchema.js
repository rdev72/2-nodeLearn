const mongoose = require ('mongoose')
const userSchema = mongoose.Schema ({
    Name : {type: String},
    Email : {type: String, reqquired:true},
    password : {type: String , reqquired:true}
})
module.exports = mongoose.model('user',userSchema)