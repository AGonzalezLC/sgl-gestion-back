import { Schema, model } from 'mongoose';

const PartnerSchema = new Schema({
    name: String,
    address: String,
    phone: String,
    postalCode: String,
    nif: String,
    location: String,
});
export default model('Partner', PartnerSchema);