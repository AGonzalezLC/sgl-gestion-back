"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const InvoiceSchema = new mongoose_1.Schema({
    idClient: { type: String, required: false, unique: false },
    invoiceNumber: { type: String, required: false, lowercase: true },
    date: { type: Date, default: Date.now },
    detail: { type: Array }
});
exports.default = mongoose_1.model('Invoice', InvoiceSchema);
