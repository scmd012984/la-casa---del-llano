import Image, { type ImageProps } from "next/image";
import { getImagePlaceholder } from "@/lib/image-placeholders";
import {
  IMAGE_QUALITY,
  IMAGE_SIZES,
  mediaSrc,
} from "@/lib/image-delivery";

type OptimizedImageProps = Omit<ImageProps, "quality" | "placeholder"> & {
  qualityPreset?: keyof typeof IMAGE_QUALITY;
  localKey?: string;
  useBlur?: boolean;
  /** Sirve el JPG/PNG original sin pasar por /images/opt/*.webp */
  preferOriginal?: boolean;
};

function resolveLocalKey(src: ImageProps["src"]): string | undefined {
  if (typeof src !== "string" || !src.startsWith("/images/")) return undefined;
  const filename = src.split("/").pop() ?? "";
  return filename.replace(/\.(jpe?g|png|webp)$/i, "");
}

export default function OptimizedImage({
  src,
  alt,
  qualityPreset = "content",
  localKey,
  useBlur = true,
  preferOriginal = false,
  sizes,
  priority = false,
  className = "",
  ...rest
}: OptimizedImageProps) {
  const originalSrc = typeof src === "string" ? src : src;
  const resolvedSrc =
    typeof originalSrc === "string" && !preferOriginal
      ? mediaSrc(originalSrc)
      : originalSrc;
  const key =
    localKey ??
    resolveLocalKey(typeof src === "string" ? src : "") ??
    resolveLocalKey(typeof originalSrc === "string" ? originalSrc : "");
  const blurDataURL = useBlur && key ? getImagePlaceholder(key) : undefined;

  return (
    <Image
      src={resolvedSrc}
      alt={alt}
      quality={IMAGE_QUALITY[qualityPreset]}
      sizes={sizes ?? IMAGE_SIZES.section}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      placeholder={blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL}
      className={className}
      {...rest}
    />
  );
}

export { IMAGE_SIZES, IMAGE_QUALITY };
