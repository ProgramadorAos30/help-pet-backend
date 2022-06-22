import { getLoggerInstance } from "../utils/Logger";
import { PetDTO, PetDTOValidator } from "../entities";
import { PetRepository as repository } from "../data";

import { Request, Response } from "express";
import { ValidationError } from "yup";

const getAllPets = async (req: Request, res: Response) => {
  const logger = getLoggerInstance();
  logger.logInfo("Executing -> getAllPets");
  const pets = await repository.getPets();

  if (pets.length < 1) {
    res.status(204).send();
    return;
  }

  res.status(200).json({ result: pets });
};

const getPetById = async (req: Request, res: Response) => {
  const logger = getLoggerInstance();
  logger.logInfo("Executing -> getPetById");
  const id = req.params.id;

  const pet = await repository.getPetById(Number(id));

  if (!pet) {
    res.status(204).send();
    return;
  }

  res.status(200).json({ result: pet });
};

const createPet = async (req: Request, res: Response) => {
  const logger = getLoggerInstance();
  logger.logInfo("Executing -> createPet");

  const { body } = req;

  let newPet: PetDTO;
  try {
    newPet = await PetDTOValidator.validate(body, { abortEarly: false });
  } catch (error) {
    res.status(500).json({ message: (error as ValidationError).errors });
    return;
  }

  const pet = await repository.createPet(newPet);

  if (!pet) {
    res.status(500).json({ message: "Something went wrong, try again latter!" });
    return;
  }

  res.status(201).json({ result: pet });
};

const updatePet = async (req: Request, res: Response) => {
  const logger = getLoggerInstance();
  logger.logInfo("Executing -> updatePet");

  const { body } = req;

  let updatedPet: PetDTO;
  try {
    updatedPet = await PetDTOValidator.validate(body, { abortEarly: false });
  } catch (error) {
    res.status(500).json({ message: (error as ValidationError).errors });
    return;
  }
  if ((updatedPet.id ?? 0) < 1) {
    res.status(400).json({ message: "Invalid organization id" });
    return;
  }

  const pet = await repository.updatePet(updatedPet);

  if (!pet) {
    res.status(500).json({ message: "Something went wrong, try again latter!" });
    return;
  }

  if (pet.getDataValue("id") === -1) {
    res.status(400).json({ message: "Inexistent item with passed ID" });
    return;
  }

  res.status(200).json({ result: pet });
};

const deletePet = async (req: Request, res: Response) => {
  const logger = getLoggerInstance();
  logger.logInfo("Executing -> deletePet");
  const { id, confirmation: deletionConfirmation } = req.body;

  if (!deletionConfirmation) {
    res.status(403).json({ message: "Deletion confirmation required" });
    return;
  }

  if ((Number(id) ?? 0) < 1) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }

  const deleted = await repository.deletePet(Number(id));

  if (!deleted) {
    res.status(500).send();
    return;
  }

  res.status(200).json({ deleted });
};

export { getAllPets, getPetById, createPet, updatePet, deletePet };
