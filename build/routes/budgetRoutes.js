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
const Budget_1 = __importDefault(require("../models/Budget"));
const mongoose_1 = __importDefault(require("mongoose"));
const faker_1 = __importDefault(require("faker"));
class BudgetRoutes {
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
        this.router.post('/create', this.create);
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const resPerPage = 6;
            const page = req.params.page || 1;
            try {
                const budgets = yield Budget_1.default.find()
                    .skip((resPerPage * page) - resPerPage)
                    .limit(resPerPage);
                const numOfBudgets = yield Budget_1.default.find().count();
                res.json({
                    budgets: budgets,
                    currentPage: page,
                    pages: Math.ceil(numOfBudgets / resPerPage),
                    numOfResults: numOfBudgets
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
                const budget = yield Budget_1.default.find({ body });
                res.json(budget);
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
                const budget = yield Budget_1.default.findById({ _id: id });
                res.json(budget);
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
                let budget;
                if (_id) {
                    budget = yield Budget_1.default.findOneAndUpdate({ _id }, body, { new: true });
                }
                else {
                    let newBudget = new Budget_1.default(body);
                    newBudget.save();
                }
                res.json({ status: res.status, data: budget });
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
                yield Budget_1.default.findOneAndRemove({ _id: id });
                res.json({ response: 'Budget deleted Successfully' });
            }
            catch (e) {
                console.log(e);
                res.json(e.message);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (let i = 0; i < 100; i++) {
                    yield Budget_1.default.create({
                        idClient: faker_1.default.random.uuid(),
                        budgetNumber: faker_1.default.random.uuid(),
                        date: faker_1.default.date.between('2019-01-01', '2019-12-21'),
                        detail: [
                            {
                                id: 'a01',
                                quantity: '1',
                                price: '10',
                                name: 'Producto a01 ',
                                description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                                type: 'product',
                            },
                            {
                                id: 'a02',
                                quantity: '1',
                                price: '10',
                                name: 'Producto a02 ',
                                description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                                type: 'service',
                            },
                            {
                                id: 'a03',
                                quantity: '1',
                                price: '10',
                                name: 'Producto a03 ',
                                description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                                type: 'product',
                            },
                            {
                                id: 'a04',
                                quantity: '1',
                                price: '10',
                                name: 'Producto a04 ',
                                description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                                type: 'product',
                            },
                            {
                                id: 'a01',
                                quantity: '1',
                                price: '10',
                                name: 'Producto a01 ',
                                description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                                type: 'product',
                            },
                            {
                                id: 'a02',
                                quantity: '1',
                                price: '10',
                                name: 'Producto a02 ',
                                description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                                type: 'service',
                            },
                            {
                                id: 'a03',
                                quantity: '1',
                                price: '10',
                                name: 'Producto a03 ',
                                description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                                type: 'product',
                            },
                            {
                                id: 'a04',
                                quantity: '1',
                                price: '10',
                                name: 'Producto a04 ',
                                description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                                type: 'product',
                            },
                            {
                                id: 'a01',
                                quantity: '1',
                                price: '10',
                                name: 'Producto a01 ',
                                description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                                type: 'product',
                            },
                            {
                                id: 'a02',
                                quantity: '1',
                                price: '10',
                                name: 'Producto a02 ',
                                description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                                type: 'service',
                            },
                            {
                                id: 'a03',
                                quantity: '1',
                                price: '10',
                                name: 'Producto a03 ',
                                description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                                type: 'product',
                            },
                            {
                                id: 'a04',
                                quantity: '1',
                                price: '10',
                                name: 'Producto a04 ',
                                description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                                type: 'product',
                            },
                            {
                                id: 'a01',
                                quantity: '1',
                                price: '10',
                                name: 'Producto a01 ',
                                description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                                type: 'product',
                            },
                            {
                                id: 'a02',
                                quantity: '1',
                                price: '10',
                                name: 'Producto a02 ',
                                description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                                type: 'service',
                            },
                            {
                                id: 'a03',
                                quantity: '1',
                                price: '10',
                                name: 'Producto a03 ',
                                description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                                type: 'product',
                            },
                            {
                                id: 'a04',
                                quantity: '1',
                                price: '10',
                                name: 'Producto a04 ',
                                description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                                type: 'product',
                            },
                            {
                                id: 'a01',
                                quantity: '1',
                                price: '10',
                                name: 'Producto a01 ',
                                description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                                type: 'product',
                            },
                            {
                                id: 'a02',
                                quantity: '1',
                                price: '10',
                                name: 'Producto a02 ',
                                description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                                type: 'service',
                            },
                            {
                                id: 'a03',
                                quantity: '1',
                                price: '10',
                                name: 'Producto a03 ',
                                description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                                type: 'product',
                            },
                            {
                                id: 'a04',
                                quantity: '1',
                                price: '10',
                                name: 'Producto a04 ',
                                description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus quisquam placeat asperiores nesciunt est eaque ab sit vel deleniti laudantium, dolorum fugit neque totam unde eveniet fugiat quo, nostrum provident at dignissimos. Perspiciatis, repellendus. Rerum sint incidunt dolorem laborum, perspiciatis natus quidem quibusdam quam dolor! Sint quibusdam recusandae rem saepe est qui quos laudantium dignissimos totam hic eaque enim veritatis dolorum quidem, beatae eum inventore deserunt? Enim dolorum aut doloribus soluta nostrum laudantium sapiente facilis nisi repellendus facere? Perferendis deleniti quod soluta eos, iste aperiam quam sapiente officia iure facilis, ex ullam tempora fugiat maxime nihil! Quas impedit porro similique.',
                                type: 'product',
                            }
                        ]
                    });
                }
                res.send('Budgets created successfully');
            }
            catch (err) {
                console.error(err.message);
                res.send(err);
            }
        });
    }
}
const budgetRoutes = new BudgetRoutes();
budgetRoutes.routes();
exports.default = budgetRoutes.router;
