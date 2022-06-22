import { PetController } from "../controllers/index";
import { Router } from "express";
import { Endpoint } from "../middlewares/";
import { PERMISSIONS } from "../utils/Permissions";

const setup = () => {
  const router = Router();
  router.get("/", (req, res) => Endpoint(req, res, PetController.getAllPets, PERMISSIONS.USER));
  return router;
};

export { setup };
