import { sites } from "@/lib/content";

export function Analytics() {
  if (sites.zh.analyticsProvider === "none") return null;
  // 统计适配层预留。只有在配置具体提供商并补充匿名化参数后才加载脚本。
  return null;
}
