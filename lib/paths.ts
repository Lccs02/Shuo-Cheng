export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(value: string) {
  if (!value.startsWith("/") || !basePath) return value;
  if (value === basePath || value.startsWith(`${basePath}/`)) return value;
  return `${basePath}${value}`;
}

export function withoutBasePath(value: string) {
  if (!basePath || !value.startsWith(basePath)) return value;
  return value.slice(basePath.length) || "/";
}
