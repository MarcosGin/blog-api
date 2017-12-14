import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as favicon from 'serve-favicon';
import * as compression from 'compression';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';

// import routers
import PostRouter from './router/PostRouter';
import UserRouter from './router/UserRouter';
// Server class

class Server  {

    public app: express.Application;
    public publicDir;

    constructor() {
        this.app = express();
        this.publicDir = express.static(`${__dirname}/public`),
        this.config();
        this.routes();
    }

    public config() {
        // set up moogoose
        const MONGO_URI = 'mongodb://localhost/test';
        mongoose.connect(MONGO_URI || process.env.MONGODB_URI);

        // config
        this.app.use(bodyParser.urlencoded({ extended: true }))        
        this.app.use(bodyParser.json());
        this.app.use(this.publicDir);
        this.app.use(favicon(`${__dirname}/public/assets/img/favicon.ico`));
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(helmet());        
        this.app.use(cors());
    }

    public routes(): void {
        let router: express.Router;
        router = express.Router();
        router.get('/', (req, res, next) => {
            res.render('index', { title: 'Home'});
        });

        this.app.use('/', router);
        this.app.use('/api/v1/posts', PostRouter);
        this.app.use('/api/v1/users', UserRouter);
        
    }
}
// export
export default new Server().app;