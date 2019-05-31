const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:{
        type:String,
    },
    
    avatar:{//图片地址
        type:String,
    },
    title:{
        type:String,
    },
    // category:{
    //     //只能表示一个分类
    //     type:mongoose.SchemaTypes.ObjectId,
    //     ref:'Category'
    // }
    categories:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Category'
    }],
    scores:{
        difficult:{type:Number},
        skills:{type:Number},
        attack:{type:Number},
        survive:{type:Number}
    },
    skills:[{
        icon:{type:String},
        name:{type:String},
        description:{type:String},
        tips:{type:String}
    }],
    items1:[{   //顺风出装
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Item'
    }],
    items2:[{   //顺风出装
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Item'
    }],
    //铭文  与装备基本一样
    usageTips:{type:String},
    battleTips:{type:String},
    teamTips:{type:String},
    partners:[{
        hero:{type:mongoose.SchemaTypes.ObjectId,ref:"Hero"},
        description:{type:String}
    }]
})

module.exports = mongoose.model('Hero',schema)