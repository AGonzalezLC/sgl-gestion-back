"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DetailSchema = new mongoose_1.Schema({
    idHeader: { type: String, required: true, unique: true },
    product: []
});
exports.default = mongoose_1.model('Detail', DetailSchema);
