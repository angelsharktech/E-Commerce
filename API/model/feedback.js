import mongoose from 'mongoose'

const feedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    mob_no : String,
    message:String,
});

export default mongoose.model('feedback', feedbackSchema);