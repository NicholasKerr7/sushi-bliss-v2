interface AssetIconProps {
  alt?: string;
  className?: string;
  loading?: "eager" | "lazy";
  size?: number;
  src?: string;
}

/** Renders packaged raster icon assets with fixed, predictable dimensions. */
export function AssetIcon({
  alt = "",
  className = "",
  loading = "lazy",
  size = 24,
  src,
}: AssetIconProps) {
  if (!src) {
    return null;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      className={`inline-block shrink-0 object-contain ${className}`}
      decoding="async"
      height={size}
      loading={loading}
      src={src}
      width={size}
    />
  );
}
