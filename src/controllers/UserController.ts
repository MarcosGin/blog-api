import { Request, Response } from 'express';
import * as _ from "lodash";
import { User, IUser } from '../models/models';

export class UserController {

    public getAll(req: Request, res: Response): void {
        User.find(( err, data) => {
            if(err){
                return res.status(500).json({ error: err });
            }
            res.json({ users: data });
        });
    }

    public get(req: Request, res: Response): void {
        const username: string = req.params.username;
        User.findByUsername(username, (err, data) => {
            if (err) {
                return res.status(500).json({ error: err });
            } 
            if(data){ res.json(data); }else{ res.status(404).json({message: 'Not found this user'}); }
        });
    }

    public create(req: Request, res: Response): void {
        const user: IUser = new User();
        _.assign(user, req.body);
        
        user.save((err, data) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ message: 'The user was created succesfully' });
        });
    }

    public update(req: Request, res: Response): void {
        const username: string = req.params.username;
        User.findOneAndUpdate({ username }, req.body, (err, data) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ message: 'The user was updated succesfully' });
        });
    }

    public delete(req: Request, res: Response): void {
        const username: string = req.params.username;
        User.findOneAndRemove({ username }, (err, data) => {
            if(err){
                return res.status(500).json({ error: err });
            }
            if (data) {
                res.json({ message: 'The user was deleted succesfully' });
            } else {
                res.json({ message: 'The user not was deleted succesfully' });
            }
        });
    }
}