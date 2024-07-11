import { Router } from "express";
import restaurants from "./routes/Restaurants";

const routes = () => {
  const app = Router();
  restaurants(app);
  return app;
};

export default routes;
