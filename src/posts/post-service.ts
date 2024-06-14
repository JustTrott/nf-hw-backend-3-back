import mongoose from "mongoose";
import { CreatePostDto } from "./dtos/createPost.dot";
import PostModel, { IPost } from "./models/Post";

class PostService {
	async getPosts(): Promise<IPost[]> {
		return await PostModel.find().exec();
	}

	async getPostById(id: string): Promise<IPost | null> {
		return await PostModel.findOne({ id }).exec();
	}

	async createPost(createPostDto: CreatePostDto): Promise<IPost> {
		const { id, title, type, date, image, video } = createPostDto;
		const newPost = new PostModel({
			id,
			title,
			type,
			date,
			image,
		});
		if (video) {
			newPost.set("video", video);
		}

		await newPost.save();
		return newPost;
	}
}

export default PostService;
