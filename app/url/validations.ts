import { z } from "zod"

export const url = z.string().url()
export const code = z.string().min(1)
export const CreateShortUrl = z.object({
  url,
  code,
})
