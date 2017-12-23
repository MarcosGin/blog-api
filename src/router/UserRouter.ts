import { UserController } from './../controllers/UserController';
import { Router, Request, Response, NextFunction } from 'express';

class UserRouter {

    router: Router;
    userCtrl: UserController;

    constructor() {
        this.router = Router();
        this.userCtrl = new UserController();
        this.routes();
    }
    
    routes() {
        this.router.get('/', this.userCtrl.getAll);
        this.router.get('/:username', this.userCtrl.get);
        this.router.post('/', this.userCtrl.create);
        this.router.put('/:username', this.userCtrl.update);
        this.router.delete('/:username', this.userCtrl.delete);
    }


}
// export
const userRoutes = new UserRouter();
userRoutes.routes();

export default userRoutes.router;
