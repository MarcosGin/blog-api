import { Request, Response } from 'express';
import * as _ from "lodash";
import Post from '../models/Post';

export class PostController {

    public getAll(req: Request, res: Response): void {
        Post.find({})
            .then((data) => res.json({ posts: data }))
            .catch((err) => res.json({ error: err.errmsg }))
    }
    public get(req: Request, res: Response): void {
        const slug: string = req.params.slug;
        Post.findOne({ slug })
            .then((data) => {
                if (data) { res.json(data); } else { res.json({ message: 'The post not was found' }); }
            })
            .catch((err) => res.json({ error: err.errmsg }))
    }
    public create(req: Request, res: Response): void {
        const post = new Post();
        _.assign(post, req.body);

        post.save()
            .then((data) => res.json({ message: 'The post was created succesfully' }))
            .catch((err) => res.json({ error: err.errmsg }))
    }
    public update(req: Request, res: Response): void {
        const slug: string = req.params.slug;
        Post.findOneAndUpdate({ slug }, req.body)
            .then((data) => res.json({ message: 'The post was updated succesfully' }))
            .catch((err) => res.json({ error: err.errmsg }))
    }

    public delete(req: Request, res: Response): void {
        const slug: string = req.params.slug;
        Post.findOneAndRemove({ slug })
            .then((data) => {
                if (data) {
                    res.json({ message: 'The post was deleted succesfully' });
                } else {
                    res.json({ message: 'The post not was deleted succesfully' });
                }
            })
            .catch((err) => res.json({ error: err.errmsg }))            
    }
}
