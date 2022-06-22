import moment from "moment";
import { Model } from "sequelize/types";
import { PetModel, PetDTO } from "../entities";

const getPets = async () => {
  const pets = await PetModel.findAll({
    where: { deletedAt: null },
  });
  return pets;
};

const getPetById = async (id: number) => {
  const pet = await PetModel.findOne({
    where: { deletedAt: null, id },
  });
  return pet;
};

const createPet = async (item: PetDTO) => {
  const newPet = await PetModel.create({
    name: item.name,
    description: item.description,
    profileImage: item.profileImage,
    animalType: item.animalType,
    breed: item.breed,
    createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
  });

  return newPet;
};

const updatePet = async (item: PetDTO) => {
  const currentPet = await getPetById(Number(item.id));
  if (!currentPet) {
    return { id: -1 } as unknown as Model<any, any>;
  }

  const updatedPet = await currentPet.update({
    name: item.name || currentPet.getDataValue("name"),
    description: item.description || currentPet.getDataValue("description"),
    profileImage: item.profileImage || currentPet.getDataValue("profileImage"),
    animalType: item.animalType || currentPet.getDataValue("animalType"),
    breed: item.breed || currentPet.getDataValue("breed"),
    updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
  });

  return updatedPet;
};

const deletePet = async (id: number) => {
  const currentPet = await getPetById(id);
  if (!currentPet) {
    return false;
  }

  await currentPet.update({
    deletedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
  });

  return true;
};

export { getPets, getPetById, createPet, updatePet, deletePet };
