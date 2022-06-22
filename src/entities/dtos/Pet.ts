import * as yup from "yup";

export const PetDTOValidator = yup.object().shape({
  id: yup.number(),
  name: yup.string().required(),
  description: yup.string(),
  profileImage: yup.string(),
  animalType: yup.string().required(),
  breed: yup.string().required(),
});

export type PetDTO = yup.InferType<typeof PetDTOValidator>;