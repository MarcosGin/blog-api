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
        this.router.get('/', this.userCtrl.GetUsers);
        this.router.get('/:username', this.userCtrl.GetUser);
        this.router.post('/', this.userCtrl.CreateUser);
        this.router.put('/:username', this.userCtrl.UpdateUser);
        this.router.delete('/:username', this.userCtrl.DeleteUser);
    }


}
// export
const userRoutes = new UserRouter();
userRoutes.routes();

export default userRoutes.router;
