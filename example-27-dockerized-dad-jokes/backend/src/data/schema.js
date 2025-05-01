import mongoose from "mongoose";
const Schema = mongoose.Schema;

const dadJokesSchema = new Schema({
    text: {
        type: String,
        required: true
    }
});

export const DadJoke = mongoose.model("DadJoke", dadJokesSchema);