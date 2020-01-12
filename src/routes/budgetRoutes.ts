import { Request, Response, Router, response, NextFunction } from 'express';
import Budget from '../models/Budget';
import mongoose from 'mongoose';
import faker from 'faker';

class BudgetRoutes {

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
        this.router.post('/create', this.create);
    }

    async getAll(req: Request, res: Response, next: any) {
        const resPerPage = 6;
        const page: any = req.params.page || 1;
        try {
            const budgets = await Budget.find()
                .skip((resPerPage * page) - resPerPage)
                .limit(resPerPage);
            const numOfBudgets = await Budget.find().count();
            res.json({
                budgets: budgets,
                currentPage: page,
                pages: Math.ceil(numOfBudgets / resPerPage),
                numOfResults: numOfBudgets
            });
        } catch (err) {
            console.error(err.message);
        }
    }

    async getBy(req: Request, res: Response) {
        const { body } = req;
        try {
            const budget = await Budget.find({ body });
            res.json(budget);
        } catch (e) {
            console.log(e);
            res.json(e.message);
        }
    }

    async getById(req: Request, res: Response) {
        const id = mongoose.Types.ObjectId(req.params._id);
        try {
            const budget = await Budget.findById({ _id: id });
            res.json(budget);
        } catch (e) {
            console.log(e);
            res.json(e.message);
        }
    }

    async save(req: Request, res: Response) {
        const { body } = req;
        const { _id } = body;
        try {
            let budget;
            if (_id) {
                budget = await Budget.findOneAndUpdate({ _id }, body, { new: true });
            } else {
                let newBudget = new Budget(body);
                newBudget.save();
            }
            res.json({ status: res.status, data: budget });
        } catch (e) {
            console.log(e);
            res.json(e.message);
        }
    }

    async delete(req: Request, res: Response) {
        const id = mongoose.Types.ObjectId(req.params._id);
        try {
            await Budget.findOneAndRemove({ _id: id });
            res.json({ response: 'Budget deleted Successfully' });
        } catch (e) {
            console.log(e);
            res.json(e.message);
        }
    }

    async create(req: Request, res: Response) {
        try {
            for (let i = 0; i < 100; i++) {
                await Budget.create({

                    idClient: faker.random.uuid(),
                    budgetNumber: faker.random.uuid(),
                    date: faker.date.between('2019-01-01', '2019-12-21'),
                    detail: [
                        {
                            id:'a01',
                            quantity:'1',
                            price:'10',
                            name:'Producto a01 ',
                            description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                            type:'product',
                        },
                        {
                            id:'a02',
                            quantity:'1',
                            price:'10',
                            name:'Producto a02 ',
                            description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                            type:'service',
                        },
                        {
                            id:'a03',
                            quantity:'1',
                            price:'10',
                            name:'Producto a03 ',
                            description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                            type:'product',
                        },
                        {
                            id:'a04',
                            quantity:'1',
                            price:'10',
                            name:'Producto a04 ',
                            description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                            type:'product',
                        },
                        {
                            id:'a01',
                            quantity:'1',
                            price:'10',
                            name:'Producto a01 ',
                            description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                            type:'product',
                        },
                        {
                            id:'a02',
                            quantity:'1',
                            price:'10',
                            name:'Producto a02 ',
                            description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                            type:'service',
                        },
                        {
                            id:'a03',
                            quantity:'1',
                            price:'10',
                            name:'Producto a03 ',
                            description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                            type:'product',
                        },
                        {
                            id:'a04',
                            quantity:'1',
                            price:'10',
                            name:'Producto a04 ',
                            description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                            type:'product',
                        },
                        {
                            id:'a01',
                            quantity:'1',
                            price:'10',
                            name:'Producto a01 ',
                            description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                            type:'product',
                        },
                        {
                            id:'a02',
                            quantity:'1',
                            price:'10',
                            name:'Producto a02 ',
                            description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                            type:'service',
                        },
                        {
                            id:'a03',
                            quantity:'1',
                            price:'10',
                            name:'Producto a03 ',
                            description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                            type:'product',
                        },
                        {
                            id:'a04',
                            quantity:'1',
                            price:'10',
                            name:'Producto a04 ',
                            description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                            type:'product',
                        },
                        {
                            id:'a01',
                            quantity:'1',
                            price:'10',
                            name:'Producto a01 ',
                            description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                            type:'product',
                        },
                        {
                            id:'a02',
                            quantity:'1',
                            price:'10',
                            name:'Producto a02 ',
                            description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                            type:'service',
                        },
                        {
                            id:'a03',
                            quantity:'1',
                            price:'10',
                            name:'Producto a03 ',
                            description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                            type:'product',
                        },
                        {
                            id:'a04',
                            quantity:'1',
                            price:'10',
                            name:'Producto a04 ',
                            description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                            type:'product',
                        },
                        {
                            id:'a01',
                            quantity:'1',
                            price:'10',
                            name:'Producto a01 ',
                            description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                            type:'product',
                        },
                        {
                            id:'a02',
                            quantity:'1',
                            price:'10',
                            name:'Producto a02 ',
                            description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                            type:'service',
                        },
                        {
                            id:'a03',
                            quantity:'1',
                            price:'10',
                            name:'Producto a03 ',
                            description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                            type:'product',
                        },
                        {
                            id:'a04',
                            quantity:'1',
                            price:'10',
                            name:'Producto a04 ',
                            description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                            type:'product',
                        }
                    ]
                });
            }
            res.send('Budgets created successfully')
        } catch (err) {
            console.error(err.message);
            res.send(err);
        }
    }

}

const budgetRoutes = new BudgetRoutes();
budgetRoutes.routes();

export default budgetRoutes.router;