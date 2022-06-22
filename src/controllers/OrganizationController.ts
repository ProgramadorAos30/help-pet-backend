import { getLoggerInstance } from "../utils/Logger";
import { OrganizationDTOValidator, OrganizationDTO } from "../entities";
import { OrganizationRepository as repository } from "../data";

import { Request, Response } from "express";
import { ValidationError } from "yup";

const getAllOrganizations = async (req: Request, res: Response) => {
  const logger = getLoggerInstance();
  logger.logInfo("Executing -> getAllOrganizations");
  const organizations = await repository.getOrganizations();

  if (organizations.length < 1) {
    res.status(204).send();
    return;
  }

  res.status(200).json({ result: organizations });
};

const getOrganizationById = async (req: Request, res: Response) => {
  const logger = getLoggerInstance();
  logger.logInfo("Executing -> getOrganizationById");
  const id = req.params.id;

  const organization = await repository.getOrganizationById(Number(id));

  if (!organization) {
    res.status(204).send();
    return;
  }

  res.status(200).json({ result: organization });
};

const createOrganization = async (req: Request, res: Response) => {
  const logger = getLoggerInstance();
  logger.logInfo("Executing -> createOrganization");

  const { body } = req;

  let newOrganization: OrganizationDTO;
  try {
    newOrganization = await OrganizationDTOValidator.validate(body, { abortEarly: false });
  } catch (error) {
    res.status(500).json({ message: (error as ValidationError).errors });
    return;
  }

  const organization = await repository.createOrganization(newOrganization);

  if (!organization) {
    res.status(500).json({ message: "Something went wrong, try again latter!" });
    return;
  }

  res.status(201).json({ result: organization });
};

const updateOrganization = async (req: Request, res: Response) => {
  const logger = getLoggerInstance();
  logger.logInfo("Executing -> updateOrganization");

  const { body } = req;

  let updatedOrganization: OrganizationDTO;
  try {
    updatedOrganization = await OrganizationDTOValidator.validate(body, { abortEarly: false });
  } catch (error) {
    res.status(500).json({ message: (error as ValidationError).errors });
    return;
  }
  if ((updatedOrganization.id ?? 0) < 1) {
    res.status(400).json({ message: "Invalid organization id" });
    return;
  }

  const organization = await repository.updateOrganization(updatedOrganization);

  if (!organization) {
    res.status(500).json({ message: "Something went wrong, try again latter!" });
    return;
  }

  if (organization.getDataValue("id") === -1) {
    res.status(400).json({ message: "Inexistent item with passed ID" });
    return;
  }

  res.status(200).json({ result: organization });
};

const deleteOrganization = async (req: Request, res: Response) => {
  const logger = getLoggerInstance();
  logger.logInfo("Executing -> deleteOrganization");
  const { id, confirmation: deletionConfirmation } = req.body;

  if (!deletionConfirmation) {
    res.status(403).json({ message: "Deletion confirmation required" });
    return;
  }

  if ((Number(id) ?? 0) < 1) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }

  const deleted = await repository.deleteOrganization(Number(id));

  if (!deleted) {
    res.status(500).send();
    return;
  }

  res.status(200).json({ deleted });
};

export { getAllOrganizations, getOrganizationById, createOrganization, updateOrganization, deleteOrganization };
