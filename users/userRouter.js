const express = require('express');

const User = require('./userDb')

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!


  //I have no idea what this one is supposed to do
});

router.post('/:id/posts',validateUserId, (req, res) => {
  // do your magic!
  User.insert(req.body)
  .then(data => {
    res.status(201).json(data)
  })
  .catch(error => {
    res.status(404).json({
      message:error.message,
      stack:error.stack
    })
  })
});

router.get('/', (req, res) => {
  // do your magic!
  User.get()
  .then(data => {
    console.log(data)
    res.status(200).json(data)
  })
  .catch(error => {
    res.status(400).json({message:error.message,stack:error.stack})
  })
});

router.get('/:id', validateUserId,(req, res) => {
  // do your magic!
  res.status(200).json(req.user);

});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  User.getUserPosts(req.id)
  .then(data => {
    res.status(200).json(data)
  })
  .catch()
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const id = req.params.id

  User.getById(id)
  .then(data => {
    if(data){
      req.user = data
      next()
    }else{
      next({ code: 404, message: 'There is no user with id ' + id })
    }
  })
  .catch(error => {
    next({ code: 500, message: 'Something crashed and burned' })
  })
}

function validateUser(req, res, next) {
  // do your magic!
  if(!req.body){
    next({code: 400, message:'Missing user data'})
  }else{
    if(!req.body.name){
      next({code:400, message:"missing required name field"})
    }else{
      req.user = req.body
    }
  }

}

function validatePost(req, res, next) {
  // do your magic!
  if(!req.body){
    next({code: 400, message:'Missing post data'})
  }else{
    if(!req.body.text){
      next({code:400, message:"missing required text field"})
    }else{
      req.user = req.body
    }
  }
}

router.use((err, req, res, next) => {
  res.status(err.code).json({ message: err.message })
});

module.exports = router;
