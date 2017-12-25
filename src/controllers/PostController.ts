import { Request, Response } from 'express';
import * as _ from "lodash";
import { Post, IPost } from '../models/models';

export class PostController {

    public getAll(req: Request, res: Response): void {
        Post.find((err, data) => {
            if (err) { return res.status(500).json({ error: err }); }
            res.json({ posts: data });     
        });
    }

    public get(req: Request, res: Response): void {
        const slug: string = req.params.slug;
        Post.findBySlug(slug, (err, data) => {
            if (err) { return res.status(500).json({ error: err }); }
            if (data) { res.json(data); } else { res.status(404).json({ message: 'Not found this post' }); }  
        });
    }

    public create(req: Request, res: Response): void {
        const post: IPost = new Post();
        _.assign(post, req.body);

        post.save((err, data) =>{
            if(err){ return res.status(500).json({ error: err }); }
            res.json({ message: 'The post was created succesfully' });
        });
    }

    public update(req: Request, res: Response): void {
        const slug: string = req.params.slug;
        Post.findOneAndUpdate({ slug }, req.body, (err, data) => {
            if (err) { return res.status(500).json({ error: err }); }  
            if (data) { res.json({ message: 'The post was updated succesfully' }); } else { res.json({ message: 'The post not was updated succesfully' }); }            res.json({ message: 'The post was updated succesfully' });
        });
    }

    public delete(req: Request, res: Response): void {
        const slug: string = req.params.slug;
        Post.findOneAndRemove({ slug }, (err, data) => {
            if (err) { return res.status(500).json({ error: err }); }
            if (data) { res.json({ message: 'The post was deleted succesfully' }); } else { res.json({ message: 'The post not was deleted succesfully' });}
        });
    }
}