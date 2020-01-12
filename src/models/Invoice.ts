import { Schema, model } from 'mongoose';

const InvoiceSchema = new Schema({
    idClient: { type: String, required: false, unique: false },
    invoiceNumber: { type: String, required: false, lowercase: true },
    date: { type: Date, default: Date.now },
    detail: {type: Array }
});
export default model('Invoice', InvoiceSchema);