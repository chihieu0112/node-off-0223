var express = require('express');
var router = express.Router();
const itemModel = require('../db/schema')

router.get('/', function(req, res, next) {
  res.redirect('/list')
});

router.get('/list', async function(req, res, next) {
  let list = await itemModel.find()
  const pageNumber = req.query.page || 1 
  const chunks = sliceIntoChunks(list, 5)
  const pagesTotal = chunks.length
  for (let i = pageNumber - 1; i < pageNumber; i++) {
    list = chunks[i]
  }
  res.render('pages/list', {
    list,
    pagesTotal
  })

  function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}
});

router.post('/list/action', async function(req, res, next) {
  const body = req.body
  const action = body.action.split('/')[2]
  const todosId = Array.isArray(body.todo) ? body.todo : [body.todo]
  switch (action) {
    case 'done':
      await itemModel.updateMany({id: {$in: todosId}}, {done: true})
      break;
    case 'undone':
      await itemModel.updateMany({id: {$in: todosId}}, {done: false})
      break;
    case 'delete':
      await itemModel.deleteMany({id: {$in: todosId}}, {done: true})
      break;
    default:
      break;
  }
  res.redirect('/list')
});

// router.get('/dashboard/(:status)', async (req, res) => {
//   let items = await itemModel.find()
//   let activeItems = await itemModel.find({status: 'active'})
//   let inActiveItems = await itemModel.find({status: 'inactive'})
//   let statusFilter = [
//     {status: 'all', link: '/dashboard/all', count: items.length, class: 'default'},
//     {status: 'active', link: '/dashboard/active', count: activeItems.length, class: 'default'},
//     {status: 'inactive', link: '/dashboard/inactive', count: inActiveItems.length, class: 'default'},
//   ]
//   const status = req.params.status
//   statusFilter.forEach((item) => {
//     if (status === item.status) {
//       item.class = 'success'
//     }
//   })
//   switch (status) {
//     case 'active': 
//       items = activeItems
//       break;
    
//     case 'inactive': 
//       items = inActiveItems
//       break;

//     case 'all': 
//       break;
//     default:
//       res.redirect('/dashboard/all')
//       break;
//   }

//   let searchParam = req.query.search
//   if (req.query.search) {
//     let searchObj = { name: { "$regex": searchParam.toLowerCase(), "$options": "i" } }
//     if (status !== 'all') {
//       searchObj.status = status
//     }
//     items = await itemModel.find(searchObj)
//   }
//   res.render('pages/dashboard', {
//     title: 'Item Managment',
//     items,
//     statusFilter,
//     searchParam
//   });
// });

module.exports = router;
