const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:{
        type:String,
    },
    
    icon:{//图片地址
        type:String,
    }
})

module.exports = mongoose.model('Item',schema)