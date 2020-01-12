"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BudgetSchema = new mongoose_1.Schema({
    idClient: { type: String, required: true },
    budgetNumber: { type: String, required: true },
    date: { type: Date, default: Date.now },
    detail: { type: Array }
});
exports.default = mongoose_1.model('Budget', BudgetSchema);
