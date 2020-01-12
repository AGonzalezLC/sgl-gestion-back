import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import invoiceRoutes from './routes/invoiceRoutes';
import partnerRoutes from './routes/partnerRoutes';
import budgetRoutes from './routes/budgetRoutes';
import productRoutes from './routes/productRoutes';

class Server {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        const MONGO_URI = 'mongodb://localhost/restapi';
        mongoose.set('useFindAndModify', true);
        mongoose.connect(MONGO_URI || process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }).then(db=>console.log('DB CONNECTED'));
        //Settings
        this.app.set('port', process.env.PORT || 4000);
        //Middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }

    routes() {
        this.app.use(indexRoutes);
        this.app.use('/invoices',invoiceRoutes);
        this.app.use('/partners',partnerRoutes);
        this.app.use('/budgets',budgetRoutes);
        this.app.use('/products',productRoutes);
    }


    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        })
    }
}

const server = new Server();
server.start();