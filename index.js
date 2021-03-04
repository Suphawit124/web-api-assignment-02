const express = require('express')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectId
const app = express()

app.use(express.json())

const url = 'mongodb+srv://superadmin:123456aZ@cluster0.vufob.mongodb.net/booksdb?retryWrites=true&w=majority'
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
let db, booksCollection

async function connect() {
    await client.connect()
    db = client.db('booksdb')
    booksCollection = db.collection('books')
}
connect()

// POST /books
app.post('/books', async (req, res) => {
    //input
    let newTitle = req.body.title
    let newPrice = req.body.price
    let newUnit = req.body.unit
    let newIsbn = req.body.isbn
    let newImage = req.body.image_url

    // key: value
    let newBook = {
        title: newTitle,
        price: newPrice,
        unit: newUnit,
        isbn: newIsbn,
        image_url: newImage,
    }
    let bookID = 0

    //process
    const result = await booksCollection.insertOne(newBook)
    bookID = result.insertedId

    //output
    
    res.status(201).json(bookID)
})

app.get('/books/:id', async (req, res) => {
    //input
    let id = req.params.id

    //process
    const book = await booksCollection.findOne({ _id: ObjectID(id) })

    //output
    res.status(200).json(book)
})

const port = 3000
app.listen(3000, () => console.log(`Server started at ${port}`))