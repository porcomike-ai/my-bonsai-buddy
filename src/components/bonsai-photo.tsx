import { useEffect, useState } from "react";
import { getCachedPhotoBlob } from "@/lib/photo-cache";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;
    
    if (!photoId) {
      setBlob(undefined);
      return;
    }

    setIsLoading(true);

    // On transmet le path ET le type de bucket pour que le photo-cache puisse construire l'URL Supabase si besoin
    getCachedPhotoBlob({ 
      storagePath: photoId, 
      bucket: "bonsai-photos" 
    })
      .then((resBlob) => {
        if (!cancelled) {
          setBlob(resBlob ?? undefined);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setBlob(undefined);
          setIsLoading(false);
        }
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
          "flex items-center justify-center bg-gradient-to-br from-secondary via-muted to-sage/30 text-muted-foreground transition-opacity duration-300",
          isLoading ? "animate-pulse" : "",
          fallbackClassName ?? className,
        )}
      >
        <Leaf className="h-8 w-8 opacity-40" />
      </div>
    );
  }

  return (
    <img 
      src={url} 
      alt="" 
      loading="lazy" 
      decoding="async" 
      className={className} 
    />
  );
}
