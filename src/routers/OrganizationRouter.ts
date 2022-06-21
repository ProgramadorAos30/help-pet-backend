import { OrganizationController } from "../controllers/index";
import { Router } from "express";
import { Endpoint } from "../middlewares/";
import { PERMISSIONS } from "../utils/Permissions";

const setup = () => {
  const router = Router();
  router.get("/list", (req, res) => Endpoint(req, res, OrganizationController.getAllOrganizations, PERMISSIONS.USER));
  router.get("/:id", (req, res) => Endpoint(req, res, OrganizationController.getOrganizationById, PERMISSIONS.USER));
  router.post("/create", (req, res) =>
    Endpoint(req, res, OrganizationController.createOrganization, PERMISSIONS.ORG_MANAGER)
  );
  router.post("/update", (req, res) =>
    Endpoint(req, res, OrganizationController.updateOrganization, PERMISSIONS.ORG_MANAGER)
  );
  router.delete("/delete/", (req, res) =>
    Endpoint(req, res, OrganizationController.deleteOrganization, PERMISSIONS.ORG_MANAGER)
  );

  return router;
};

export { setup };
