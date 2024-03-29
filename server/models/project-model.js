const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  techStack: {
    type: [String],
    required: true,
  },
  gitHubLink: {
    type: String,
    required: true,
  },
});

const Project = new model("Project", projectSchema);

module.exports = Project;
