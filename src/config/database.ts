import * as mongoose from "mongoose";

(mongoose as any).Promise = global.Promise;

mongoose.connect("mongodb://localhost/test", {
    useMongoClient: true,
});


export { mongoose };