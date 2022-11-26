const express = require('express')
const Joi = require('@hapi/joi')
const { getItems, getItemsByCategory, insertItem, registerAccount, loginAccount, getEvent, insertData, insertDataContent, getContent } = require('../database/db')

const router = express.Router()

const multer  = require('multer')
const disk = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'storage/')

  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})



router.use("/static", express.static("storage"));

router.get("/", (req,res) => {
  res.send("Haii")
})

router.get("/blog/:category", (req,res) => {
  const category = req.params.category
  getItemsByCategory(category)
    .then((items) => {
      res.json(items)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
})

router.get('/category', (req, res) => {
  getItems()
    .then((items) => {
      items = items.map((item) => ({
        id: item._id,
        category: item.category,
      }))
      return res.json({
        message: "Successfully Get Category",
        data: items
      })
    })
    .catch((err) => {
      return res.status(500).json(err)
    })
})

router.post("/admin/category", (req,res) => {
  const category = req.body
  insertItem(category)
    .then(() => {
      res.status(201).json({
        message: "Successfully Insert Category"
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
})

router.post("/sign-up", (req,res) => {
  const account = req.body
  registerAccount(account)
    .then(() => {
      res.status(201).json({
        status: 201,
        message: "Successfully Insert Account"
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
})

router.post("/sign-in", (req,res) => {
  const account = req.body
  loginAccount(account)
  .then((data) => {
    if(data){
      res.status(200).json({
        status: 200,
        data: {
          id: data._id,
          name: data.name,
          role: data.role
        },
        message: "Successfully Login"
      })
    } else {
      res.status(404).json({
        status: 404,
        message: "Username or Password Incorrect"
      })
    }
  })
  .catch((err) => {
    console.log(err)
    res.status(500).end()
  })
})

router.get("/event", (req,res) => {
  getEvent().then((data) => {
    res.status(200).json({
      status: 200,
      data: data,
      message: "Successfully Get Event"
    })

  })
})

router.post("/create",multer({storage: disk}).single("image"), (req,res) => {
  req.body.filename = req.file.filename
  const data = req.body

  insertDataContent(data).then((datas) => {
    res.status(201).json({
      status: 201,
      data: datas,
      message: "Successfully Insert Data"
    })
  })
})

router.get("/content", (req,res) => {
  getContent().then((data) => {
    res.status(200).json({
      status: 200,
      data: data,
      message: "Successfully Get Content"
    })
  })
})


module.exports = router
