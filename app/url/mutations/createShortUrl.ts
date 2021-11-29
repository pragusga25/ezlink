import { resolver } from "blitz"
import db from "db"
import { CreateShortUrl } from "../validations"

export default resolver.pipe(resolver.zod(CreateShortUrl), async ({ code, url }) => {
  const storedData = await db.url.findUnique({ where: { code } })
  if (storedData) {
    throw new Error("Short code already exists")
  }
  const newData = await db.url.create({
    data: {
      code,
      url,
    },
    select: { code: true, url: true },
  })
  return newData
})
