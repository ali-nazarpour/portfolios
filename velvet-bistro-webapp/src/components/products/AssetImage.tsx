import { useState } from "react";
import { resolveAsset } from "@/lib/assets";
import { cn } from "@/lib/utils";

interface AssetImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  priority?: boolean;
}

function svgFallback(jpgPath: string): string | null {
  if (!/\.jpe?g$/i.test(jpgPath)) return null;
  return jpgPath.replace(/\.jpe?g$/i, ".svg");
}

export function AssetImage({
  src,
  className,
  alt,
  priority = false,
  loading,
  onError,
  ...props
}: AssetImageProps) {
  const [currentSrc, setCurrentSrc] = useState(() => resolveAsset(src));
  const [failed, setFailed] = useState(false);

  return (
    <img
      src={currentSrc}
      alt={alt ?? ""}
      className={cn("object-cover", failed && "opacity-90", className)}
      loading={loading ?? (priority ? "eager" : "lazy")}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      onError={(event) => {
        onError?.(event);
        const fallback = svgFallback(src);
        if (fallback && !/\.svg$/i.test(currentSrc)) {
          setCurrentSrc(fallback);
          return;
        }
        setFailed(true);
      }}
      {...props}
    />
  );
}
