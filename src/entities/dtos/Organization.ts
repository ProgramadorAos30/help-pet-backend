import * as yup from "yup";

export const OrganizationDTOValidator = yup.object().shape({
  id: yup.number(),
  name: yup.string().required(),
  description: yup.string(),
  profileImage: yup.string(),
  latitude: yup.string().required(),
  longitude: yup.string().required(),
});

export type OrganizationDTO = yup.InferType<typeof OrganizationDTOValidator>;