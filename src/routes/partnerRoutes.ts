import { Request, Response, Router } from 'express';
import Partner from '../models/Partner';
import mongoose from 'mongoose';

class PartnerRoutes {

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
    }

    async getAll(req: Request, res: Response, next: any) {
        const resPerPage = 6;
        const page: any = req.params.page || 1;
        try {
            const partners = await Partner.find()
                .skip((resPerPage * page) - resPerPage)
                .limit(resPerPage);
            const numOfPartners = await Partner.find().count();
            res.json({
                partners: partners,
                currentPage: page,
                pages: Math.ceil(numOfPartners / resPerPage),
                numOfResults: numOfPartners
            });
        } catch (err) {
            console.error(err.message);
        }
    }

    async getBy(req: Request, res: Response) {
        const { body } = req;
        const partners = await Partner.find({ body });
        res.json(partners);
    }

    async getById(req: Request, res: Response) {
        const id = mongoose.Types.ObjectId(req.params._id);
        const partner = await Partner.findById({ _id: id });
        res.json(partner);
    }

    async save(req: Request, res: Response) {
        const { body } = req;
        const { _id } = body;
        let partner;
        if (_id) { 
            partner = await Partner.findOneAndUpdate({ _id }, body, {new: true})
        } else {
            let newPartner = new Partner(body);
            newPartner.save();
        }
        res.json({ status: res.status, data: partner });
    }

    async delete(req: Request, res: Response) {
        const id = mongoose.Types.ObjectId(req.params._id);
        await Partner.findOneAndRemove({ _id: id });
        res.json({ response: 'Partner deleted Successfully', status: res.status });
    }

}

const partnerRoutes = new PartnerRoutes();
partnerRoutes.routes();

export default partnerRoutes.router;