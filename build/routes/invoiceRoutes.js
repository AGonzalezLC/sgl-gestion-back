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
        this.router.get('/:page', this.getAll);
        this.router.get('/', this.getBy);
        this.router.post('/', this.save);
        this.router.delete('/:_id', this.delete);
        this.router.get('/:_id', this.getById);
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const resPerPage = 6;
            const page = req.params.page || 1;
            try {
                const invoices = yield Invoice_1.default.find()
                    .skip((resPerPage * page) - resPerPage)
                    .limit(resPerPage);
                const numOfInvoices = yield Invoice_1.default.find().count();
                res.json({
                    invoices: invoices,
                    currentPage: page,
                    pages: Math.ceil(numOfInvoices / resPerPage),
                    numOfResults: numOfInvoices
                });
            }
            catch (err) {
                console.error(err.message);
            }
        });
    }
    getBy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            try {
                const invoices = yield Invoice_1.default.find({ body });
                res.json(invoices);
            }
            catch (e) {
                console.log(e);
                res.json(e.message);
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = mongoose_1.default.Types.ObjectId(req.params._id);
            try {
                const invoice = yield Invoice_1.default.findById({ _id: id });
                res.json(invoice);
            }
            catch (e) {
                console.log(e);
                res.json(e.message);
            }
        });
    }
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            const { _id } = body;
            try {
                let invoice;
                if (_id) {
                    invoice = yield Invoice_1.default.findOneAndUpdate({ _id }, body, { new: true });
                }
                else {
                    let newInvoice = new Invoice_1.default(body);
                    newInvoice.save();
                }
                res.json({ status: res.status, data: invoice });
            }
            catch (e) {
                console.log(e);
                res.json(e.message);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = mongoose_1.default.Types.ObjectId(req.params._id);
            try {
                yield Invoice_1.default.findOneAndRemove({ _id: id });
                res.json({ response: 'Invoice deleted Successfully' });
            }
            catch (e) {
                console.log(e);
                res.json(e.message);
            }
        });
    }
}
const invoiceRoutes = new InvoiceRoutes();
invoiceRoutes.routes();
exports.default = invoiceRoutes.router;
