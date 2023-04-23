const mongoose = require('mongoose')

const user_schema = new mongoose.Schema({
    email :{
        type : String,
        required : true,
    },
    name : String,
    cf_handle : String,
    rating : {
        type : Number,
        default : 0,
    },
    image : String,
    maxRating : {
        type : Number,
        default : 0,
    },
    rank : {
        type : String,
        default : '-'
    }
})

const user_model = mongoose.model('UserModel',user_schema);

module.exports=user_model