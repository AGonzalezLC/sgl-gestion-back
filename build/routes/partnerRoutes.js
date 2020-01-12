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
const Partner_1 = __importDefault(require("../models/Partner"));
const mongoose_1 = __importDefault(require("mongoose"));
class PartnerRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get('/:page', this.getAll);
        this.router.get('/', this.getBy);
        this.router.post('/', this.save);
        this.router.delete('/:_id', this.delete);
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const resPerPage = 6;
            const page = req.params.page || 1;
            try {
                const partners = yield Partner_1.default.find()
                    .skip((resPerPage * page) - resPerPage)
                    .limit(resPerPage);
                const numOfPartners = yield Partner_1.default.find().count();
                res.json({
                    partners: partners,
                    currentPage: page,
                    pages: Math.ceil(numOfPartners / resPerPage),
                    numOfResults: numOfPartners
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
            const partners = yield Partner_1.default.find({ body });
            res.json(partners);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = mongoose_1.default.Types.ObjectId(req.params._id);
            const partner = yield Partner_1.default.findById({ _id: id });
            res.json(partner);
        });
    }
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            const { _id } = body;
            let partner;
            if (_id) {
                partner = yield Partner_1.default.findOneAndUpdate({ _id }, body, { new: true });
            }
            else {
                let newPartner = new Partner_1.default(body);
                newPartner.save();
            }
            res.json({ status: res.status, data: partner });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = mongoose_1.default.Types.ObjectId(req.params._id);
            yield Partner_1.default.findOneAndRemove({ _id: id });
            res.json({ response: 'Partner deleted Successfully', status: res.status });
        });
    }
}
const partnerRoutes = new PartnerRoutes();
partnerRoutes.routes();
exports.default = partnerRoutes.router;
