import { Schema, model } from 'mongoose';

let UserSchema: Schema = new Schema({
    
    username: {
        type: String,
        default: '',
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    password: {
        type: String,
        default: '',
        required: true
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
    createdAt: Date,
    updatedAt: Date,
});

export default model('User', UserSchema);