module.exports = app =>{
    const express = require('express')
    const router = express.Router({
        mergeParams:true
        //Preserve the req.params values from the parent router.
    })
    router.post('/',async(req,res)=>{
        
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    router.put('/:id',async(req,res)=>{
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })

    router.delete('/:id',async(req,res)=>{
        const model = await req.Model.findByIdAndDelete(req.params.id)
        res.send(model)
    })
    router.get('/',async(req,res)=>{
        // const items = await Category.find({})
        // const items = await req.Model.find({}).populate('parent')
        let queryOptions = {}
        if(req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find({}).setOptions(queryOptions)
        res.send(items)
    })
    router.get('/:id',async(req,res)=>{
        const item = await req.Model.findById(req.params.id)
        res.send(item)
    })

    app.use('/admin/api/rest/:resource',async(req,res,next)=>{
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../models/${modelName}`)
        next()
    },router)



    const multer = require('multer')
    //上传文件
    const upload = multer({dest:__dirname + '/../../uploads'})
    app.post('/admin/api/upload',upload.single('file'),async(req,res)=>{
            const file = req.file
            file.url = `http://localhost:3000/uploads/${file.filename}`
            res.send(file)
    })
}