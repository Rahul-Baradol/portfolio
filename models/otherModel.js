const mongoose = require('mongoose');

const otherSchema = new mongoose.Schema({
    aboutme: {type: String, required: true}
}, {timestamps: true})

mongoose.models = {}
export default mongoose.model("other", otherSchema, "other")