module.exports = app =>{
    const express = require('express')
    const router = express.Router()
    const Category = require('../../models/Category')
    router.post('/categories',async(req,res)=>{
        const model = await Category.create(req.body)
        res.send(model)
    })
    router.put('/categories/:id',async(req,res)=>{
        const model = await Category.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })

    router.delete('/categories/:id',async(req,res)=>{
        const model = await Category.findByIdAndDelete(req.params.id)
        res.send(model)
    })
    router.get('/categories',async(req,res)=>{
        // const items = await Category.find({})
        const items = await Category.find({}).populate('parent')
        res.send(items)
    })
    router.get('/categories/:id',async(req,res)=>{
        const item = await Category.findById(req.params.id)
        res.send(item)
    })

    app.use('/admin/api',router)
}