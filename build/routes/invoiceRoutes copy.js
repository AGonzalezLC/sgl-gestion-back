"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Invoice_1 = __importDefault(require("../models/Invoice"));
const mongoose_1 = __importDefault(require("mongoose"));
class InvoiceRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get('/', this.getAll);
        this.router.get('/', this.getBy);
        this.router.post('/', this.save);
        this.router.delete('/:_id', this.delete);
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const invoices = yield Invoice_1.default.find();
            res.json(invoices);
        });
    }
    getBy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            const invoices = yield Invoice_1.default.find({ body });
            res.json(invoices);
        });
    }
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            const { _id } = body;
            let invoice;
            if (_id) {
                invoice = yield Invoice_1.default.findOneAndUpdate({ _id }, body);
            }
            else {
                let newInvoice = new Invoice_1.default(body);
                newInvoice.save();
            }
            res.json({ status: res.status, data: invoice });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = mongoose_1.default.Types.ObjectId(req.params._id);
            yield Invoice_1.default.findOneAndRemove({ _id: id });
            res.json({ response: 'Invoice deleted Successfully' });
        });
    }
}
const invoiceRoutes = new InvoiceRoutes();
invoiceRoutes.routes();
exports.default = invoiceRoutes.router;
