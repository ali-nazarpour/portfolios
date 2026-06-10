import { resolveAsset } from "@/lib/assets";
import { cn } from "@/lib/utils";

interface AssetImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

export function AssetImage({ src, className, alt, ...props }: AssetImageProps) {
  return (
    <img
      src={resolveAsset(src)}
      alt={alt ?? ""}
      className={cn("object-cover", className)}
      loading="lazy"
      {...props}
    />
  );
}
