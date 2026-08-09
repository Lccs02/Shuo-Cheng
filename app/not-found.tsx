import { withBasePath } from "@/lib/paths";

export default function NotFound() {
  return (
    <main id="main-content" className="shell page-shell flex items-center">
      <div>
        <p className="eyebrow">404 · Page not found</p>
        <h1 className="mt-6 text-5xl leading-tight">这条路径尚无内容。</h1>
        <p className="prose-copy mt-5">
          The page may have moved or is not part of this static site.
        </p>
        {/* 静态导出使用完整页面跳转，避免不同静态主机对 RSC 预取路径处理不一致。 */}
        <a
          href={withBasePath("/")}
          className="mt-8 inline-flex border-b border-[var(--accent)] pb-1 text-[var(--accent)]"
        >
          返回首页 / Back home
        </a>
      </div>
    </main>
  );
}
