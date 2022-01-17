// functions 
// projetc_index, project_details, project_create_get, project_create_post, project_delete

const Project = require('../models/project');

const project_index = (req,res)=>{
  Project.find().sort({createdAt:-1})
    .then((result)=>{
      res.render('index', {projects: result});
    })
    .catch(err => console.log(err));
}

const project_create_post = (req,res)=>{
  const project = new Project({
    title:req.body.title,
    desc:req.body.desc,
    budget: req.body.budget,
    phone: req.body.phone
  });
  project.save()
    .then((result)=>{
      res.redirect('/projects');
    })
    .catch((err)=> {console.log(err)});
}


const project_details = (req,res)=>{
  const id = req.params.id;

  Project.findById(id)
    .then((result)=>{
      res.render('details', {project: result});
    })
    .catch(err=>console.log(err));
}

const project_create_get = (req, res) =>{
  res.render('create');
}


const project_delete = (req,res)=>{
  const id = req.params.id;
  Project.findByIdAndDelete(id)
    .then((result)=>{
      res.json({redirect:'/projects'})
    })
    .catch(err=> console.log(err));
}

module.exports = {
  project_index, 
  project_details,
  project_create_post, 
  project_create_get,
  project_delete
}