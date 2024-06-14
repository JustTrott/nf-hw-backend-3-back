import { Router } from "express";
import postRouter from "./posts/post-router";
// other routers can be imported here

const globalRouter = Router();

globalRouter.use(postRouter);

// other routers can be added here

export default globalRouter;
