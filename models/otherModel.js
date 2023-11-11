const mongoose = require('mongoose');

const otherSchema = new mongoose.Schema({
    aboutme: {type: String, required: true}
}, {timestamps: true})

export default mongoose.models.other || mongoose.model("other", otherSchema, "other")