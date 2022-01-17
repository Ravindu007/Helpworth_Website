const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  budget: {
    type: String,
    required: true
  },
  phone : {
    type: String,
    required: true
  }
}, {timestamps:true});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;