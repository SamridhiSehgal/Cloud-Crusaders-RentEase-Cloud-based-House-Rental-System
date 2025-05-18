const express=require('express');
const app=express();
const dotenv=require('dotenv');
const morgan=require('morgan');
const cookieParser = require('cookie-parser');

const cors=require('cors');
dotenv.config();
const port=process.env.PORT;
const path=require('path');

const ownerRouter=require('./routes/owner.routes');
const {connectToDatabase}=require('./db/db.config');

connectToDatabase();

app.set('view engine', 'ejs');
// Set custom views folder
app.set('views', path.join(__dirname, '../client/src/pages'));

//middlewares...
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));
app.use(cookieParser());
app.use(morgan('dev'));//print request, route, responseStatus, timeTaken to send...
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.use('/owner',ownerRouter);
//app.use('/tenant',tenantRouter);

app.get('/check',(req,res)=>{
    console.log('good to go..')

    res.send('i am listeing');
})


















app.listen(port,()=>{
    console.log(`App is listening on port ${port}...`)
})