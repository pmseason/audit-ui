import { z } from "zod"

export const roleTypeSchema = z.union([
  z.literal("apm"),
  z.literal("internship")
])

export const searchSourceSchema = z.object({
  name: z.string(),
  url: z.string()
})

export const searchConfigSchema = z.object({
  scrapeFrom: searchSourceSchema,
  roleType: roleTypeSchema,
  aiQuery: z.string()
})

export const searchConfigListSchema = z.array(searchConfigSchema)