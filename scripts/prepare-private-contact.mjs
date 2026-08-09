import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "private", "contact.local.json");
if (!fs.existsSync(file)) {
  console.log("未发现 private/contact.local.json；使用默认隐藏配置。");
  process.exit(0);
}

const data = JSON.parse(fs.readFileSync(file, "utf8"));
const allowed = ["personalEmail", "phone", "wechat"];
for (const key of allowed) {
  if (!(key in data)) continue;
  if (typeof data[key]?.value !== "string" || typeof data[key]?.visible !== "boolean") {
    throw new Error(`private/contact.local.json 的 ${key} 必须包含字符串 value 和布尔值 visible。`);
  }
}
console.log("本地私密联系方式配置已验证；仅 visible=true 的字段会在静态页面中渲染。");
