const routerName = 'category'
const renderName = `backend/page/${routerName}/`
var path = require('path');
const ArticleModel = require('../models/article_model')
const multer = require('multer')
const fs = require('fs')
// const renameAsync = promisify(fs.rename);
const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};
const upload = multer({
    // dest: "/upload"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

async function uploadAndSaveImage(data, reqFile) {
    // const tempPath = req.file.path;
    const { v4: uuidv4 } = require('uuid');
    const imgId = uuidv4(); 
    const targetPath = path.join(__dirname, `../public/img/upload/${imgId}-${reqFile.originalName}`);
    console.log(targetPath)
    // const imageFilter = (req, file, cb) => {
    //     const allowedTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tif', '.tiff', '.webp', '.svg'];
    //     if (allowedTypes.includes(file.mimetype)) {
    //       cb(null, true);
    //     } else {
    //       cb(new Error('Only image files are allowed!'));
    //     }
    //   };
    const allowedTypes = ['image/webp', 'image/png', 'image/jpeg'];
    if (true) {
        console.log('ok')
        return await new Promise((rs, rj) => {
            fs.rename(reqFile.tempPath, targetPath, err => {
                // if (err) return handleError(err, res);
                data.thumbnail = `${imgId}-${reqFile.originalName}`
                console.log('fs:', data)
                rs(data)
            })
        }) 
    }
    //  else {
    //     fs.unlink(tempPath, err => {
    //         if (err) return handleError(err, res);

    //         res
    //             .status(403)
    //             .contentType("text/plain")
    //             .end("Only .png and .jpg files are allowed!");
    //     });
    // }
    
    // if ( path.extname(originalName).toLowerCase() === ".jpg") {

    //     return await new Promise((rs, rj) => {
    //         fs
    //         .writeFileSync(tempPath, imageBuffer)
    //         .rename(tempPath, targetPath, err => {
    //             if (err) return handleError(err, res);
    //             data.thumbnail = `image-${imgId}`
    //             console.log('fs:', data)
    //             rs(data)
    //         })
    //     }) 
    // } else {
    //     fs.unlink(tempPath, err => {
    //         if (err) return handleError(err, res);

    //         res
    //             .status(403)
    //             .contentType("text/plain")
    //             .end("Only .png and .jpg files are allowed!");
    //     });
    // }
}

module.exports = {
    getForm: async (req, res, next) => {
        let categoryId = req.params.categoryId
        res.render(`${renderName}/form`, {
            title: 'Article',
            categoryId
        })
    },
    uploadImage: upload.single('thumbnail'),
    createArticle: async (req, res, next) => {
        let item = {
            name: req.body.name,
            ordering: Number(req.body.ordering),
            status: req.body.status,
            slug: req.body.slug,
            categoryId: req.params.categoryId
            // thumbnail: `image-${imgId}`
        }
        const file = req.file || false
        if (file) {
            console.log(file)
            const reqFile = {
                tempPath: file.path,
                originalName: file.originalname,
                type: file.mimeType
            }
            const data = await uploadAndSaveImage(item, reqFile)
            console.log('data', data)
            await ArticleModel.create(data)
        } else {
            await ArticleModel.create(item)
        }
        res.redirect(`/admin/category/${req.params.categoryId}`)
    },
    list: async (req, res, next) => {
        let allArticle = await ArticleModel.find({})
        let routeAddNew = ''
        let title = "Article"
        let countItems = {
            all: 0,
            active: 0,
            inactive: 0
        }
        res.render(`${renderName}/list`, {
            items: allArticle,
            countItems,
            routeAddNew,
            title
        })
    }


    // action: async (req, res, next) => {
    //     let countItems = await CategoryService.getCount()
    //     switch (req.params.action) {
    //         case "search":
    //             let keyword = req.query.keyword.toLowerCase()
    //             let searchedItem = await CategoryService.searchItem({ name: { $regex: keyword, $options: 'i' } })

    //             res.render(`${renderName}/list`, {
    //                 items: searchedItem,
    //                 countItems,
    //                 keyword
    //             })
    //             break;
    //         case "active":
    //             let activeItems = await CategoryService.getActive()
    //             res.render(`${renderName}/list`, {
    //                 items: activeItems,
    //                 countItems
    //             })
    //             break;
    //         case "inactive":
    //             let inactiveItems = await CategoryService.getInactive()
    //             res.render(`${renderName}/list`, {
    //                 items: inactiveItems,
    //                 countItems
    //             })
    //             break;

    //         default:
    //             break;
    //     }
    // },

}