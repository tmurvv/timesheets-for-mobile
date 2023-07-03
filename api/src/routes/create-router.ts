import { Router } from "express";

import {RouteObject} from "../Interfaces";

export const createRouter = (name: string, controllers: RouteObject) => {
  const router = Router();

  router.delete(`/${name}/:id`, controllers.del);
  router.get(`/${name}`, controllers.getAll);
  router.get(`/${name}/:id`, controllers.getOne);
  router.post(`/${name}/:id`, controllers.save);

  return router;
};
