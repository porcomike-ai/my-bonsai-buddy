import { useEffect, useState } from "react";
import { getPhoto } from "@/lib/db";
import { useBlobUrl } from "@/lib/blob-url";
import { cn } from "@/lib/utils";
import { Leaf } from "lucide-react";

export function BonsaiPhoto({
  photoId,
  className,
  fallbackClassName,
}: {
  photoId?: string;
  className?: string;
  fallbackClassName?: string;
}) {
  const [blob, setBlob] = useState<Blob | undefined>();
  useEffect(() => {
    let cancelled = false;
    if (!photoId) {
      setBlob(undefined);
      return;
    }
    getPhoto(photoId).then((p) => {
      if (!cancelled) setBlob(p?.blob);
    });
    return () => {
      cancelled = true;
    };
  }, [photoId]);
  const url = useBlobUrl(blob);
  if (!url) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-secondary via-muted to-sage/30 text-muted-foreground",
          fallbackClassName ?? className,
        )}
      >
        <Leaf className="h-8 w-8 opacity-40" />
      </div>
    );
  }
  return <img src={url} alt="" className={className} />;
}
