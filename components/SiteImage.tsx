import Image from "next/image";

type SiteImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
};

export default function SiteImage({
  src,
  alt,
  className = "",
  priority = false,
  fill = false,
  sizes,
  width,
  height,
}: SiteImageProps) {
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 800}
      height={height ?? 600}
      priority={priority}
      sizes={sizes}
      className={`object-cover ${className}`}
    />
  );
}
