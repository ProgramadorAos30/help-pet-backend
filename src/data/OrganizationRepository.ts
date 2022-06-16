import { OrganizationModel, OrganizationDTO } from "../entities";
import moment from "moment";
import { Model } from "sequelize/types";

const getOrganizations = async () => {
  const organizations = await OrganizationModel.findAll({
    where: { deletedAt: null },
  });
  return organizations;
};

const getOrganizationById = async (id: number) => {
  const organization = await OrganizationModel.findOne({
    where: { deletedAt: null, id },
  });
  return organization;
};

const createOrganization = async (item: OrganizationDTO) => {
  const newOrganization = await OrganizationModel.create({
    name: item.name,
    description: item.description,
    profileImage: item.profileImage,
    latitude: item.latitude,
    longitude: item.longitude,
    createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
  });

  return newOrganization;
};

const updateOrganization = async (item: OrganizationDTO) => {
  const currentOrganization = await getOrganizationById(Number(item.id));
  if (!currentOrganization) {
    return { id: -1 } as unknown as Model<any, any>;
  }

  const updatedOrganization = await currentOrganization.update({
    name: item.name || currentOrganization.getDataValue("name"),
    description: item.description || currentOrganization.getDataValue("description"),
    profileImage: item.profileImage || currentOrganization.getDataValue("profileImage"),
    latitude: item.latitude || currentOrganization.getDataValue("latitude"),
    longitude: item.longitude || currentOrganization.getDataValue("longitude"),
    updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
  });

  return updatedOrganization;
};

const deleteOrganization = async (id: number) => {
  const currentOrganization = await getOrganizationById(id);
  if (!currentOrganization) {
    return false;
  }

  await currentOrganization.update({
    deletedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
  });

  return true;
};

export { getOrganizations, getOrganizationById, createOrganization, updateOrganization, deleteOrganization };
