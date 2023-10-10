const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    technologies: {type: Array, required: true},
    siteLink: {type: String, required: true},
    siteLinkDesc: {type: String, required: true},
    githubLink: {type: String, required: true},
    personal: {type: Boolean, required: true}
}, {timestamps: true})

mongoose.models = {}
export default mongoose.model("projects", projectSchema, "projects");