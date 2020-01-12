"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PartnerSchema = new mongoose_1.Schema({
    name: String,
    address: String,
    phone: String,
    postalCode: String,
    nif: String,
    location: String,
});
exports.default = mongoose_1.model('Partner', PartnerSchema);
