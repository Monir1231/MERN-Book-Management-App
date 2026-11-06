const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

const express = require('express');
require('dotenv').config()
const app = express()
const port = 3000
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { title } = require('node:process');

// middleware 
app.use(express.json())
app.use(cors())

// mongodb start 

const uri = process.env.MONGODB_URL;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Create db and collection 
    const db =client.db("book-management-system");
    const bookCollection = db.collection("books");



    // create a new book 
  app.post('/books', async(req, res) => {
  const bookdata = req.body;
  try {
    const book = await bookCollection.insertOne(bookdata)
    res.status(201).json(book)
  } catch (error) {
    res.status(404).json({error: error.message})
  }

})

// get data 
app.get("/books", async (req,res)=>{
  const {page,limit,genre,minYear,maxYear,author,minPrice,maxPrice,sortBy,order,search} = req.query;
  try {
    const currentPage = Math.max(1,parseInt(page) || 1)
    const perPage = parseInt(limit) || 10;
    const skip = (currentPage - 1) * perPage

    const filter = {}
    if(search){
      filter.$or = [
        {title: {$regex:search , $options: "i"}},
         {description: {$regex:search , $options: "i"}}
      ]
    }

    if(genre) filter.genre = genre;

    if(minYear || maxYear){
      filter.publishedYear = {
        ...(minYear && {$gte:parseInt(minYear)}),
        ...(maxYear && {$lte:parseInt(maxYear)})

      }
    }

    if(author) filter.author = author;

    if(minPrice || maxPrice){
      filter.price = {
        ...(minPrice && {$gte: parseFloat(minPrice)}),
        ...(maxPrice && {$gte: parseFloat(maxPrice)})
      }
    }
     
    const sortoptions = {[sortBy || 'title']: order === 'desc' ? -1 : 1} 
    
    const [books,totalBooks] = await Promise.all([bookCollection.find(filter).sort(sortoptions).skip(skip).limit(perPage).toArray(),
      bookCollection.countDocuments(filter)])
 
    // const books = await bookCollection.find(filter).sort(sortoptions).skip(skip).limit(perPage).toArray()
    res.status(201).json({books,totalBooks,currentPage,totalpages:Math.ceil(totalBooks/perPage)})
  } catch (error) {
      res.status(404).json({error: error.message})
  }
})

// get book by id 
app.get("/books/:id", async (req,res)=>{

  const bookId = req.params.id ;

  try {
  const book = await bookCollection.findOne({_id: new ObjectId(bookId)})
  if(!book) return res.status(404).json({message:"book not found"})
    res.json(book)
  } catch (error) {
     res.status(404).json({error: error.message})
  }


})

// update book 
app.put("/books/:id",async (req,res)=>{
  try {
    const updateBook = await bookCollection.updateOne({_id: new ObjectId(req.params.id)},{$set: req.body})
      res.json(updateBook)
  } catch (error) {
     res.status(404).json({error: error.message})
  }
})

//  delete  book 
app.delete("/books/:id",async (req,res)=>{
  try {
    const deleteBook = await bookCollection.deleteOne({_id: new ObjectId(req.params.id)})
      res.json({message:"book delete succful",deleteBook})
  } catch (error) {
     res.status(404).json({error: error.message})
  }
})



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})

// monirmolla324_db_user
// 8Md8HwLxAk3Qi62M