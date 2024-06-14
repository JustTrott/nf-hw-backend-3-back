import { Router } from "express";
import PostController from "./post-controller";
import PostService from "./post-service";

//in order to provide our frontend with the user data, we need to specify user routes

const postRouter = Router();

const postService = new PostService();
const postController = new PostController(postService);

postRouter.get("/posts/", postController.getPosts);
postRouter.post("/posts/", postController.createPosts);

export default postRouter;
