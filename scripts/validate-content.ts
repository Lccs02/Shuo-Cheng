import fs from "node:fs";
import path from "node:path";
import { schemas } from "../lib/schemas";

let failed = false;

for (const [fileName, schema] of Object.entries(schemas)) {
  const filePath = path.join(process.cwd(), "content", fileName);
  try {
    const raw: unknown = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const result = schema.safeParse(raw);
    if (!result.success) {
      failed = true;
      console.error(`\n✗ content/${fileName}`);
      for (const issue of result.error.issues) {
        console.error(`  - ${issue.path.join(".") || "(root)"}: ${issue.message}`);
      }
    } else {
      console.log(`✓ content/${fileName}`);
    }
  } catch (error) {
    failed = true;
    console.error(
      `\n✗ content/${fileName}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

if (failed) process.exit(1);
console.log("\n内容结构验证通过。");
