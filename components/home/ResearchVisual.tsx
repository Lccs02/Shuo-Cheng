import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { profile } from "@/lib/content";
import type { Locale } from "@/types/content";

export function ResearchVisual({ locale }: { locale: Locale }) {
  if (!profile.researchVisualVisible || !profile.researchVisual) return null;

  return (
    <figure className="research-concept-visual">
      <div className="research-concept-image">
        <ImageWithFallback
          src={profile.researchVisual}
          alt={locale === "zh" ? profile.researchVisualAltZh : profile.researchVisualAltEn}
          sizes="(max-width: 768px) calc(100vw - 48px), 640px"
          className="research-concept-image-content"
        />
      </div>
      <figcaption>
        {locale === "zh"
          ? "AI 生成的研究主题概念插画，非本人肖像。"
          : "AI-generated research concept illustration; the depicted person is not Shuo Cheng."}
      </figcaption>
    </figure>
  );
}
