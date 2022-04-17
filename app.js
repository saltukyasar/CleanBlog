const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const ejs = require('ejs');
const Blog = require('./models/Blog');
const fs = require('fs');
const pageControllers = require('./controllers/pageControllers');
const blogControllers = require('./controllers/blogControllers');

const app = express();

mongoose.connect('mongodb+srv://cleanblog:cleanblogapp@cluster0.sbgzs.mongodb.net/cleanblog-db?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  console.log('DB connected')
}).catch((err)=>{
  console.log(err)
})

//template engine
app.set('view engine', 'ejs');

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);
//Routes
app.get('/', blogControllers.getAllBlogs);
app.get('/posts/:id', blogControllers.getBlog);
app.post('/blogs', blogControllers.createBlog);
app.put('/blogs/:id', blogControllers.updateBlog);
app.delete('/blogs/:id', blogControllers.deleteBlog);

app.get('/add_post', pageControllers.addPostPage);
app.get('/about', pageControllers.getAboutPage);
app.get('/blogs/edit/:id', pageControllers.editPage);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`sunucu ${port} portunda calisiyor...`);
});
