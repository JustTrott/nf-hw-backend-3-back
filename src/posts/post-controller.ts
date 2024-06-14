import { Request, Response } from "express";
import { CreatePostDto } from "./dtos/createPost.dot";
import PostService from "./post-service";
import { IPost } from "./models/Post";

class PostController {
	private postService: PostService;

	constructor(postService: PostService) {
		this.postService = postService;
	}

	createPosts = async (req: Request, res: Response): Promise<void> => {
		try {
			const createPostDtos: CreatePostDto[] = req.body;
			const posts = await Promise.all(
				createPostDtos.map(async (createPostDto) => {
					// Check if the post exists
					const postExists = await this.postService.getPostById(
						createPostDto.id
					);
					if (postExists) {
						console.log("Seen: " + postExists.id);
						return null; // Return null for posts that already exist
					}

					console.log("Creating: " + createPostDto.id);
					const newPost = await this.postService.createPost(
						createPostDto
					);
					return newPost;
				})
			);

			// Filter out null values (existing posts)
			const createdPosts = posts.filter((post) => post !== null);

			console.log("Posts created: " + createdPosts.length);

			if (createdPosts.length === 0) {
				res.status(400).send(
					"All posts already exist in the database."
				);
			} else {
				res.status(201).json(createdPosts); // Send only the created posts
			}
		} catch (error: any) {
			res.status(500).send({ error: error.message });
		}
	};

	getPosts = async (req: Request, res: Response): Promise<void> => {
		try {
			const posts = await this.postService.getPosts();
			res.status(200).json(posts);
		} catch (error: any) {
			res.status(500).send({ error: error.message });
		}
	};
}

export default PostController;
