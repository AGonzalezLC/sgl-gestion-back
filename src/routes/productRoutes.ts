import { Request, Response, Router } from 'express';
import Product from '../models/Product';
import mongoose from 'mongoose';
// import faker from 'faker';

class ProductRoutes {

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
            const products = await Product.find()
                .skip((resPerPage * page) - resPerPage)
                .limit(resPerPage);
            const numOfProducts = await Product.find().count();
            res.json({
                products: products,
                currentPage: page,
                pages: Math.ceil(numOfProducts / resPerPage),
                numOfResults: numOfProducts
            });
        } catch (err) {
            console.error(err.message);
        }
    }

    async getBy(req: Request, res: Response) {
        const { body } = req;
        try {
            const product = await Product.find({ body });
            res.json(product);
        } catch (e) {
            console.log(e);
            res.json(e.message);
        }
    }

    async getById(req: Request, res: Response) {
        const id = mongoose.Types.ObjectId(req.params._id);
        try {
            const product = await Product.findById({ _id: id });
            res.json(product);
        } catch (e) {
            console.log(e);
            res.json(e.message);
        }
    }

    async save(req: Request, res: Response) {
        const { body } = req;
        const { _id } = body;
        try {
            let product;
            if (_id) {
                product = await Product.findOneAndUpdate({ _id }, body, { new: true });
            } else {
                let newProduct = new Product(body);
                newProduct.save();
            }
            res.json({ status: res.status, data: product });
        } catch (e) {
            console.log(e);
            res.json(e.message);
        }
    }

    async delete(req: Request, res: Response) {
        const id = mongoose.Types.ObjectId(req.params._id);
        try {
            await Product.findOneAndRemove({ _id: id });
            res.json({ response: 'Product deleted Successfully' });
        } catch (e) {
            console.log(e);
            res.json(e.message);
        }
    }

}

const productRoutes = new ProductRoutes();
productRoutes.routes();

export default productRoutes.router;