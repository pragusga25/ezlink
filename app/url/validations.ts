import { z } from "zod"

export const url = z.string().url()
export const code = z
  .string()
  .min(1, { message: "Short code is required" })
  .regex(/^[a-zA-Z0-9-_]+$/, {
    message: "Short code invalid",
  })
export const CreateShortUrl = z.object({
  url,
  code,
})
