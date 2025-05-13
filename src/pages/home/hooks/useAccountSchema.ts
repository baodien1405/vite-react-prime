import * as yup from "yup";

export const useAccountSchema = () => {
  return yup.object({
    fullName: yup.string().required(),
    gender: yup.string().required(),
    dateOfBirth: yup.date().required().nullable(),
    jobs: yup
      .array()
      .of(yup.string().required())
      .min(1, "At least one job is required")
      .required(),
    category: yup.string().required(),
    methods: yup
      .array()
      .of(yup.string().required())
      .min(1, "At least one method is required")
      .required(),
    enable: yup.boolean().required(),
    description: yup.string().required(),
  });
};
