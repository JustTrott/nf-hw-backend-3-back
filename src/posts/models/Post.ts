import mongoose, { Document, Schema } from "mongoose";

export interface IPost extends Document {
	id: string;
	title: string;
	type: string;
	date: Date;
	fetchedDate: Date;
	image: string;
	video?: string;
}

const PostSchema: Schema = new Schema({
	id: { type: String, required: true, unique: true },
	title: { type: String, required: true },
	type: { type: String, required: true },
	date: { type: Date, required: true },
	fetchedDate: { type: Date, default: Date.now },
	image: { type: String, required: true },
	video: { type: String },
});

const Post = mongoose.model<IPost>("Post", PostSchema);

export default Post;
