import fs from "node:fs";
import path from "node:path";
import { z } from "zod";

const privateContactSchema = z.object({
  personalEmail: z.object({ value: z.string().email(), visible: z.boolean() }).optional(),
  phone: z.object({ value: z.string().min(5), visible: z.boolean() }).optional(),
  wechat: z.object({ value: z.string().min(1), visible: z.boolean() }).optional(),
});

export type VisiblePrivateContact = Partial<Record<"personalEmail" | "phone" | "wechat", string>>;

export function getVisiblePrivateContact(): VisiblePrivateContact {
  const file = path.join(process.cwd(), "private", "contact.local.json");
  if (!fs.existsSync(file)) return {};

  const parsed = privateContactSchema.safeParse(JSON.parse(fs.readFileSync(file, "utf8")));
  if (!parsed.success) {
    throw new Error(`private/contact.local.json 配置错误：${parsed.error.message}`);
  }

  const result: VisiblePrivateContact = {};
  for (const key of ["personalEmail", "phone", "wechat"] as const) {
    const field = parsed.data[key];
    if (field?.visible) result[key] = field.value;
  }
  return result;
}
