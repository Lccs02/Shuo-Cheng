import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { profile } from "@/lib/content";
import type { Locale } from "@/types/content";

export function ResearchVisual({ locale }: { locale: Locale }) {
  if (!profile.researchVisualVisible || !profile.researchVisual) return null;

  const alt = locale === "zh" ? profile.researchVisualAltZh : profile.researchVisualAltEn;

  return (
    <figure className="research-visual" data-research-visual>
      <div className="research-visual-media">
        <ImageWithFallback
          src={profile.researchVisual}
          alt={alt}
          priority
          sizes="(max-width: 800px) calc(100vw - 2rem), 27rem"
          className="research-visual-image"
        />
        <div className="research-visual-wash" aria-hidden="true" />

        <div className="research-visual-label" aria-hidden="true">
          <span>LEO</span>
          <span>RL</span>
          <span>NETWORKS</span>
        </div>

        <svg className="research-orbit" viewBox="0 0 100 100" focusable="false" aria-hidden="true">
          <ellipse cx="50" cy="50" rx="43" ry="19" />
          <ellipse cx="50" cy="50" rx="19" ry="43" transform="rotate(42 50 50)" />
          <g className="research-orbit-packet">
            <circle cx="91" cy="50" r="3.5" />
            <path d="M86 46.5h10M86 53.5h10" />
          </g>
          <circle className="research-orbit-core" cx="50" cy="50" r="7" />
        </svg>

        <div className="rl-loop" aria-hidden="true">
          <span className="rl-node">S</span>
          <i />
          <span className="rl-node rl-node-policy">π</span>
          <i />
          <span className="rl-node">A</span>
          <i />
          <span className="rl-node rl-node-reward">R</span>
        </div>
      </div>
      <figcaption className="research-visual-caption">
        <span>
          {locale === "zh"
            ? "AI 生成的研究概念图（非本人肖像）"
            : "AI-generated research concept visual (not a personal portrait)"}
        </span>
        <span>
          {locale === "zh"
            ? "卫星网络 · 资源管理 · 强化学习"
            : "Satellite networks · Resource management · Reinforcement learning"}
        </span>
      </figcaption>
    </figure>
  );
}
