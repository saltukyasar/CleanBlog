const Blog = require('../models/Blog')



exports.getAboutPage = (req, res) => {
    res.render('about');
  }

  exports.addPostPage =  (req, res) => {
    res.render('add_post');
  }

exports.editPage =  async (req,res)=>{
    const blog = await Blog.findOne({_id: req.params.id});
    res.render('edit',{
      blog,
    })
  }