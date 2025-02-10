import { z } from "zod";
import { RequiredString } from "./base";

export const categorySchema = z.object({
  _id: RequiredString,
  name: RequiredString,
});

export type Category = z.infer<typeof categorySchema>;
