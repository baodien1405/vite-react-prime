import z from "zod";

export const useGeneralSchema = () => {
  const schema = z.object({
    fullName: z.string().trim().min(1, { message: "Please enter full name" }),
    email: z
      .string()
      .min(1, { message: "Please enter an email" })
      .email({ message: "Please enter a valid email" }),
    password: z.string().trim().min(1, { message: "Please enter a password" }),
    amount: z.coerce.number(),
    description: z.string(),
    country: z.string(),
    categories: z.array(z.string()),
    gender: z.enum(["male", "female"]),
    city: z.string(),
    fromDate: z.date(),
    tradingOnline: z.boolean(),
  });

  return schema;
};
