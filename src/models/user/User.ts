import { mongoose } from "../../config/database";
import { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    profile: {
        firstname: string;
        lastname: string;
        works?: Array<string>;
        city: string;
        country: string;
        birthday?: Date;
    },
    posts: Array<Object>;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserModel extends Model<IUser> {
    findByUsername(username: string, callback: (err: any, author: IUser) => void);
    updateName(id: {}, name: string): Promise<{ nModified: number }>;
}

let schema: Schema = new Schema({
    
    username: {
        type: String,
        default: '',
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: 'Email address is required',
        trim: true,        
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true
    },
    password: {
        type: String,
        default: '',
        required: true,
        select: false
    },
    profile:{
        firstname: {
            type: String,
            default: '',
            required: true
        },
        lastname: {
            type: String,
            default: '',
            required: true
        },
        works: [],
        city:{
            type: String,
            default: '',
            require: true,
        },
        country: {
            type: String,
            default: '',
            require: true,
        },
        birthday: Date,
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

schema.static("updateName", (user: {}, name: string) => {

    return User
        .update({
            "_id": user
        }, {
            "$set": {
                "description": name
            }
        })
        .exec();
});
schema.static("findByUsername", (username: string, callback: (err: any, result: IUser) => void) => {
    return User
        .findOne({ username }, callback)
        .populate('posts', 'title content')
});

export const User = mongoose.model<IUser>("User", schema) as IUserModel;
