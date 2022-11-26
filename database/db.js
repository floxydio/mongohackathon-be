const { MongoClient, ObjectId } = require('mongodb')
const dotenv = require('dotenv')

dotenv.config()
const connectionUrl = `${process.env.DB_HOST}`
const dbName = `${process.env.DB_NAME}`

let db

const init = () =>
  MongoClient.connect(connectionUrl, { useNewUrlParser: true }).then((client) => {
    db = client.db(dbName)
  })

const getItems = () => {
  const collection = db.collection('category')
  return collection.find({}).toArray()
}

const getItemsByCategory = (category) => {
  const collection = db.collection('blog')
  return collection.find({ category }).toArray()
}

const insertItem = (item) => {
  const collection = db.collection('category')
  return collection.insertOne(item)
}

const registerAccount = (account) => {
  const collection = db.collection('account')
  return collection.insertOne(account)
}

const loginAccount = (account) => {
  const collection = db.collection('account')
  return collection.findOne(account)
}


const getEvent = () => {
  const collection = db.collection('event')
  return collection.find({}).toArray()
}

const insertDataContent = (item) => {
  const collection = db.collection("content")
  return collection.insertOne(item)
}

const getContent = () => {
  const collection = db.collection('content')
  return collection.find({}).toArray()
}

module.exports = { init, getItems,getItemsByCategory, insertItem, registerAccount,loginAccount, getEvent,insertDataContent,getContent}
