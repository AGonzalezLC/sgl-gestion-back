"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    reference: { type: String },
    date: { type: Date, default: Date.now },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: false },
    description: { type: String, required: false },
});
exports.default = mongoose_1.model('Product', ProductSchema);
