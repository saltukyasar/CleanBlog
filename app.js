const express = require('express')
const app =express();

app.get('/',(req,res)=>{
    res.status(200).send('Index sayfasi');
    const blog ={ id: 1, title: "Blog title", description: "Blog description" }
    console.log(blog);
})



const port =3000;

app.listen(port, ()=>{
    console.log(`sunucu ${port} portunda calisiyor...`);
})