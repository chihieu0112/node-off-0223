var express = require('express');
var router = express.Router();
const itemModel = require('../db/schema')
const { v4: uuidv4 } = require('uuid');

/* GET users listing. */
router.get('/form/add', function (req, res, next) {

  res.render('pages/form', {
    title: 'Add Todo',
    action: '/form/addTodo',
    isFormAdd: true
  })

  // switch (action) {
  //   case 'add':

  //     break;

  //   case 'edit':
  //     res.render('pages/form', {
  //       title: 'Edit Todo',
  //       action: '/form/editTodo'
  //     })
  //     break;

  //   default:
  //     break;
  // }

});

router.post('/form/addTodo', async function (req, res, next) {
  const body = req.body
  const newTodo = body.newTodo
  await itemModel.create({ id: uuidv4(), name: newTodo, done: false })
  res.redirect('/list')
});

router.get('/form/edit/:todoId', async function (req, res, next) {
  const todoId = req.params.todoId
  const todo = await itemModel.findOne({ id: todoId })
  const todoName = todo.name
  res.render('pages/form', {
    title: 'Edit Todo',
    action: `/form/editTodo/${todoId}`,
    todoEdit: todoName,
    isFormAdd: false
  })
});

router.post('/form/editTodo/:todoId', async function (req, res, next) {
  const editedTodo = req.body.editedTodo
  const todoId = req.params.todoId
  await itemModel.findOneAndUpdate({id: todoId}, {name: editedTodo})
  res.redirect('/list')
});

module.exports = router;
