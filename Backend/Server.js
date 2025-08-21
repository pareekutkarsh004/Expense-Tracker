import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send('HELLO FROM THE BACKEND!')
})


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})