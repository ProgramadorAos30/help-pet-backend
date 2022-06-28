import { UserModel, UserDTO } from "../entities";
import moment from "moment";
import { Model } from "sequelize/types";

const getUser = () => {
  const users = UserModel.findAll({ where: { deletedAt: null } });
  return users;
};

const getUserById = (id: number) => {
  const user = UserModel.findOne({ where: { deletedAt: null, id } });
  return user;
};

const createUser = async (item: UserDTO) => {
  const newUser = await UserModel.create({
    fullName: item.fullName,
    phone: item.phone,
    email: item.email,
    birthDate: item.birthDate,
    documentType: item.documentType,
    document: item.document,
    createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
  });

  return newUser;
};

const updateUser = async (item: Record<string, unknown>) => {
  const currentUser = await getUserById(Number(item.id));
  if (!currentUser) {
    return { id: -1 } as unknown as Model<any, any>;
  }

  const updatedUser = await currentUser.update({
    fullName: item.fullName || currentUser.getDataValue("fullName"),
    phone: item.phone || currentUser.getDataValue("phone"),
    email: item.email || currentUser.getDataValue("email"),
    birthDate: item.birthDate || currentUser.getDataValue("birthDate"),
    documentType: item.documentType || currentUser.getDataValue("documentType"),
    document: item.document || currentUser.getDataValue("document"),
    updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
  });

  return updatedUser;
};

const deleteUser = async (id: number) => {
  const currentUser = await getUserById(id);
  if (!currentUser) {
    return false;
  }

  await currentUser.update({
    deletedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
  });

  return true;
};

export { getUser, getUserById, createUser, updateUser, deleteUser };
