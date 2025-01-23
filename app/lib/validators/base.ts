import z from "zod";

export const RequiredString = z.string().min(1, "Required");
