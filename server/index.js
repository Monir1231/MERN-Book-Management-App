const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

const express = require('express');
require('dotenv').config()
const app = express()
const port = 3000
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');

// middleware 
app.use(express.json())
app.use(cors)

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

    // create a book 

  app.post('/books', async(req, res) => {
  const bookdata = req.body;
 console.log(bookdata)
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