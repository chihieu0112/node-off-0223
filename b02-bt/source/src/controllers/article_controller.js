const routerName = 'article'
const renderName = `backend/page/${routerName}/`
var path = require('path');
const ArticleModel = require('../models/article_model')
const CategoryModel = require('../models/category_model')
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
    dest: "/upload"
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
        let action = req.params.action 
        if (action === 'addItem') {
            let categoryList =  await CategoryModel.find({})
            let categoryListObj = categoryList.map((item) => {
                return {
                    id: item._id,
                    name: item.name
                }
            })
            res.render(`${renderName}/form`, {
                categoryListObj
            })
        } else if (action === 'editItem') {

        }
    },
    uploadImage: upload.single('thumbnail'),
    createArticle: async (req, res, next) => {
        let item = {
            name: req.body.name,
            status: req.body.status,
            slug: req.body.slug,
            desc: req.body.desc,
            categoryId: req.body.category,
            content: req.body.content,
        }
        const file = req.file || false
        console.log(file)
        if (file) {
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
        res.redirect(`/admin/article/list`)
    },
    list: async (req, res, next) => {
        let allArticle = await ArticleModel.find({})
        let articles = await Promise.all(
            allArticle.map(async (item) => {
                const category = await CategoryModel.find({_id: item.categoryId})
                return {
                    ...item._doc,
                    categoryName: category.length ? category[0].name : 'Unknown'
                }
            })
        )
        let routeAddNew = ''
        let title = "Article"
        let countItems = {
            all: 0,
            active: 0,
            inactive: 0
        }
        res.render(`${renderName}/list`, {
            items: articles,
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