import { Request, Response, Router } from 'express';
import Invoice from '../models/Invoice';
import mongoose from 'mongoose';

class InvoiceRoutes {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/:page', this.getAll);
        this.router.get('/', this.getBy);
        this.router.post('/', this.save);
        this.router.delete('/:_id', this.delete);
        this.router.get('/:_id', this.getById);
    }

    async getAll(req: Request, res: Response, next: any) {
        const resPerPage = 6;
        const page: any = req.params.page || 1;
        try {
            const invoices = await Invoice.find()
                .skip((resPerPage * page) - resPerPage)
                .limit(resPerPage);
            const numOfInvoices = await Invoice.find().count();
            res.json({
                invoices: invoices,
                currentPage: page,
                pages: Math.ceil(numOfInvoices / resPerPage),
                numOfResults: numOfInvoices
            });
        } catch (err) {
            console.error(err.message);
        }
    }

    async getBy(req: Request, res: Response) {
        const { body } = req;
        try {
            const invoices = await Invoice.find({ body });
            res.json(invoices);
        } catch (e) {
            console.log(e);
            res.json(e.message);
        }
    }

    async getById(req: Request, res: Response) {
        const id = mongoose.Types.ObjectId(req.params._id);
        try {
            const invoice = await Invoice.findById({ _id: id });
            res.json(invoice);
        } catch (e) {
            console.log(e);
            res.json(e.message);
        }
    }

    async save(req: Request, res: Response) {
        const { body } = req;
        const { _id } = body;
        try {
            let invoice;
            if (_id) {
                invoice = await Invoice.findOneAndUpdate({ _id }, body, { new: true })
            } else {
                let newInvoice = new Invoice(body);
                newInvoice.save();
            }
            res.json({ status: res.status, data: invoice });
        } catch (e) {
            console.log(e);
            res.json(e.message);
        }
    }

    async delete(req: Request, res: Response) {
        const id = mongoose.Types.ObjectId(req.params._id);
        try {
            await Invoice.findOneAndRemove({ _id: id });
            res.json({ response: 'Invoice deleted Successfully' });
        } catch (e) {
            console.log(e);
            res.json(e.message);
        }
    }

}

const invoiceRoutes = new InvoiceRoutes();
invoiceRoutes.routes();

export default invoiceRoutes.router;