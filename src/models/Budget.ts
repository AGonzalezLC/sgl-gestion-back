import { Schema, model } from 'mongoose';

const BudgetSchema = new Schema({
    idClient: { type: String, required: true },
    budgetNumber: { type: String, required: true },
    date: { type: Date, default: Date.now },
    detail: {type: Array }

});
export default model('Budget', BudgetSchema);