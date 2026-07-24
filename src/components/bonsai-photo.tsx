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
  useEffect(() => {
    let cancelled = false;
    if (!photoId) {
      setBlob(undefined);
      return;
    }
    // `photoId` contient désormais le chemin Storage (ex. "{uid}/{bonsaiId}/{photoId}.jpg").
    // Passe par le cache partagé pour éviter de retélécharger une photo déjà
    // vue ailleurs dans l'app (accueil, collection, fiche détail...).
    getCachedPhotoBlob({ storagePath: photoId, poterieId: undefined })
      .then((blob) => {
        if (!cancelled) setBlob(blob);
      })
      .catch(() => {
        if (!cancelled) setBlob(undefined);
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
  return <img src={url} alt="" loading="lazy" decoding="async" className={className} />;
}
