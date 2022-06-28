import * as yup from "yup";

export const UserDTOValidator = yup.object().shape({
  id: yup.number(),
  fullName: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().required(),
  birthDate: yup.string().required(),
  documentType: yup.string().required(),
  document: yup.string().required(),
});

export type UserDTO = yup.InferType<typeof UserDTOValidator>;
