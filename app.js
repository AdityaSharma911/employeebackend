const express= require('express');
const app = express();
const mongoose=require('mongoose');
require('dotenv').config();
const router = require('./router');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.url, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    } catch (err) {
        console.error(err)
    }
}

connectDB();

app.use(express.json())
app.use('/router', router);
mongoose.connection.once('open',()=>{
    console.log('connected');
    app.listen(80,()=>console.log('server on'))
})


