const multer=require('multer')

const storage=multer.diskStorage({
    destination:function(request,file,cb)
    {
        cb(null,'./images' )
        console.log(file)
    },filename:function(request,file,cb)
    {
        cb(null,file.originalname)
    }
})

module.exports=multer