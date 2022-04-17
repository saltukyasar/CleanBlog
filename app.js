const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const path = require('path');
const ejs = require('ejs');
const Blog = require('./models/Blog')

const app = express();

mongoose.connect('mongodb://localhost/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//template engine
app.set('view engine', 'ejs');

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['POST','GET'],
  })
)

app.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.render('index', {
    blogs,
  });
});

app.get('/posts/:id', async (req,res)=>{
  const blog = await Blog.findById(req.params.id)
  res.render('post',{
    blog,
  })
})

app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add_post', (req, res) => {
  res.render('add_post');
});
app.post('/blogs', async (req, res) => {
  await Blog.create(req.body);
  res.redirect('/');
});
app.put('/blogs/:id', async (req,res)=>{
  const blog = await Blog.findOne({ _id: req.params.id });
  blog.title = req.body.title;
  blog.detail = req.body.detail;
  blog.save();

  res.redirect(`/posts/${req.params.id}`);
})
app.get('/blogs/edit/:id', async (req,res)=>{
  const blog = await Blog.findOne({_id: req.params.id});
  res.render('edit',{
    blog,
  })
})

const port = 3000;

app.listen(port, () => {
  console.log(`sunucu ${port} portunda calisiyor...`);
});
