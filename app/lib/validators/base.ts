import z from "zod";

export const DBBaseSchema = z.object({
  _id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const RequiredString = z.string().min(1, "Required");

export const ServerActionResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export type ServerActionResponse = z.infer<typeof ServerActionResponseSchema>;
