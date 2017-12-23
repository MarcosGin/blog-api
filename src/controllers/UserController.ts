import { Request, Response,} from 'express';
import User from '../models/User';

export class UserController {

    public GetUsers(req: Request, res: Response): void {
        User.find({})
            .then((data) => {
                const status = 200;
                res.status(status).json({
                    status,
                    data
                });
            })
            .catch((err) => {
                const status = 500;
                res.status(status).json({
                    status,
                    err
                });
            })
    }

    public GetUser(req: Request, res: Response): void {
        const username: string = req.params.username;
        User.findOne({ username }).populate('posts', 'title content')
            .then((data) => {
                const status = 200;
                res.json({
                    status,
                    data
                });
            })
            .catch((err) => {
                const status = 500;
                res.json({
                    status,
                    err
                });
            })
    }

    public CreateUser(req: Request, res: Response): void {
        const username: string = req.body.username;
        const email: string = req.body.email;
        const password: string = req.body.password;
        const profile: Object = req.body.profile;
        const posts: string[] = req.body.posts;

        const user = new User({
            username,
            email,
            password,
            profile,
            posts
        })
        user.save()
            .then((data) => {
                const status = 200;
                res.status(200).json({
                    status,
                    data
                });
            })
            .catch((err) => {
                const status = 500;
                res.json({
                    status,
                    err
                });
            })
    }


    public UpdateUser(req: Request, res: Response): void {
        const username: string = req.params.username;
        User.findOneAndUpdate({ username }, req.body)
            .then((data) => {
                const status = 200;
                res.json({
                    status,
                    data
                });
            })
            .catch((err) => {
                const status = 500;
                res.json({
                    status,
                    err
                });
            })
    }

    public DeleteUser(req: Request, res: Response): void {
        const username: string = req.params.username;
        User.findOneAndRemove({ username })
            .then((data) => {
                const status = 200;
                res.json({
                    status,
                    data
                });
            })
            .catch((err) => {
                const status = 500;
                res.json({
                    status,
                    err
                });
            })
    }

}