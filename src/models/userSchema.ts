import { z } from "zod";

export const userSchermaRegister = z.object({
  body: z.object({
    username: z.string().min(3, "Name too short"),
    email: z.email({ pattern: z.regexes.html5Email }),
    password: z.string().min(6, "Password too short"),
  }),
});

export const userSchermaLogin = z.object({
  body: z.object({
    email: z.email({ pattern: z.regexes.html5Email }),
    password: z.string().min(6, "Password too short"),
  }),
});
