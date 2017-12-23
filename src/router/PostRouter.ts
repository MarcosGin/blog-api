import { Router }  from 'express';
import { PostController } from './../controllers/PostController';

class PostRouter {

    router: Router;
    postCtrl: PostController;

    constructor() {
        this.router = Router();
        this.postCtrl = new PostController();
        this.routes();
    }

    routes(){
        this.router.get('/', this.postCtrl.getAll);
        this.router.get('/:slug', this.postCtrl.get);
        this.router.post('/', this.postCtrl.create);        
        this.router.put('/:slug', this.postCtrl.update);    
        this.router.delete('/:slug', this.postCtrl.delete);                    
    }


}
// export
const postRoutes = new PostRouter();
postRoutes.routes();

export default postRoutes.router;
