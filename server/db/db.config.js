// const { MongoClient, ServerApiVersion } = require('mongodb');
// require('dotenv').config();

// // const DB_PASS = process.env.DB_PASS;
// // if (!DB_PASS) {
// //     throw new Error("DB_PASS is not defined in the environment variables.");
// // }

// const uri = `mongodb+srv://RentEase_mongodb:rentease04@renteasecluster.fs68ztf.mongodb.net/?retryWrites=true&w=majority&appName=RentEaseCluster`;

// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     },
// });

// async function connectToDatabase() {
//     try {
//         await client.connect();
//         console.log("Successfully connected to MongoDB!");
//         return client;
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//         throw error;
//     }
// }
// // connectToDatabase();

// module.exports = { client, connectToDatabase };
const mongoose = require('mongoose');

module.exports.connectToDatabase=()=>{
    mongoose.connect('mongodb://localhost:27017/RentEase')
.then(() => console.log('Database connected successfully...'))
.catch(err => console.error('Database connection error:', err));
}
