import { mongoose } from "../../config/database";
import { Document, Model, Schema } from 'mongoose';

export interface IPost extends Document{
    title: string;
    slug: string;
    content: string;
    image?: string;
    tags?: Array<string>;    
    createdAt: Date;
    updatedAt: Date;
}

export interface IPostModel extends Model<IPost> {
    findBySlug(slug: string, callback: (err: any, post: IPost) => void);
}

let schema: Schema = new Schema({
    title:     { type: String, required: true },
    slug:      { type: String, required: true, unique: true, lowercase: true},
    content:   { type: String, required: true },
    image:     { type: String, required: false },
    tags:      { type: String, required: false },    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

schema.static("findBySlug", (slug: string, callback: (err: any, result: IPost) => void) => {
    return Post
        .findOne({ slug }, callback)
});
export const Post = mongoose.model<IPost>("Post", schema) as IPostModel;