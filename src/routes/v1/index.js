import express from "express";
import userRoute from "./user.route.js";

const router = express.Router();

const routes = [
  {
    path: "/api",
    route: userRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
