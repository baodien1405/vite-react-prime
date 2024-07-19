import z from "zod";

export const useGeneralSchema = () => {
  const schema = z
    .object({
      fullName: z
        .string()
        .trim()
        .min(1, { message: "Please enter full name" })
        .refine((val) => val.length <= 10, {
          message: "String can't be more than 10 characters",
        }),
      email: z
        .string()
        .min(1, { message: "Please enter an email" })
        .email({ message: "Please enter a valid email" }),
      password: z
        .string()
        .trim()
        .min(1, { message: "Please enter a password" }),
      amount: z.number({ message: "Please enter an amount" }),
      description: z
        .string()
        .trim()
        .min(1, { message: "Please enter a description" }),
      country: z.string().trim().min(1, { message: "Please select a country" }),
      categories: z.array(z.string()),
      gender: z.enum(["male", "female"]),
      city: z.string().trim().min(1, { message: "Please select a city" }),
      fromDate: z.date({ message: "Please select a date" }),
      tradingOnline: z.boolean(),
    })
    .superRefine((val, ctx) => {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please specify a phone number",
        path: ["phone"],
      });
    });

  return schema;
};
