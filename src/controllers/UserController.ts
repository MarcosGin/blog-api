import { Request, Response } from 'express';
import * as _ from "lodash";
import User from '../models/User';

export class UserController {

    public getAll(req: Request, res: Response): void {
        User.find()
            .then((data) => res.json({ users: data }))
            .catch((err) => res.json({ error: err.errmsg }))
    }

    public get(req: Request, res: Response): void {
        const username: string = req.params.username;
        User.findOne({ username }).populate('posts', 'title content')
            .then((data) => {
                if(data){ res.json(data); }else{ res.json( {message: 'The user not was exists'}); }
            })
            .catch((err) => res.json({ error: err.errmsg }))
    }

    public create(req: Request, res: Response): void {
        const user = new User();
        _.assign(user, req.body);
        
        user.save()
            .then((data) => res.json({ message: 'The user was created succesfully' }))
            .catch((err) => res.json({ error: err.errmsg }))
    }


    public update(req: Request, res: Response): void {
        const username: string = req.params.username;
        User.findOneAndUpdate({ username }, req.body)
            .then((data) => res.json({ message: 'The user was updated succesfully' }))
            .catch((err) => res.json({ error: err.errmsg }))
    }

    public delete(req: Request, res: Response): void {
        const username: string = req.params.username;
        User.findOneAndRemove({ username })
            .then((data) => { 
                if(data){ 
                    res.json({ message: 'The user was deleted succesfully' }); 
                }else{ 
                    res.json({ message: 'The user not was deleted succesfully' }); 
                }
            })
            .catch((err) => res.json({ error: err.errmsg }))
    }

}