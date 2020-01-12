import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
    name: { type: String, required: true },
    reference: { type: String },
    date: { type: Date, default: Date.now },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: false },
    description : { type: String, required: false },
});
export default model('Product', ProductSchema);