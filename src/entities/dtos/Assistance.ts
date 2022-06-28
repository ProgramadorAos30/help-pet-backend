import * as yup from "yup";

export const AssistanceDTOValidator = yup.object().shape({
  id: yup.number(),
  petId: yup.string().required(),
  assistanceDescription: yup.string().required(),
  paymentInfo: yup.string().required(),
});

export type AssistanceDTO = yup.InferType<typeof AssistanceDTOValidator>;
