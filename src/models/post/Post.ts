import { mongoose } from "../../config/database";
import { Document, Model, Schema } from 'mongoose';

export interface IPost extends Document{
    title: string;
    slug: string;
    content: string;
    user: Schema.Types.ObjectId;
    image?: string;
    tags?: Array<string>;
    status: Array<string>; 
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
    user:      { type: Schema.Types.ObjectId, ref: 'User', required: 'The user is required' },
    image:     { type: String, required: false },
    tags:      { type: String, required: false },   
    status:    { type: String, required: true, enum: ['Disabled', 'Activated'], default: 'Activated'},  
}, { timestamps: true });

schema.static("findBySlug", (slug: string, callback: (err: any, result: IPost) => void) => {
    return Post
        .findOne({ slug }, callback)
});
export const Post = mongoose.model<IPost>("Post", schema) as IPostModel;