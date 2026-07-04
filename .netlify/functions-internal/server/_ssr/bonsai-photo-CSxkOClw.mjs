import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { z as getPhotoBlob, e as useBlobUrl, q as cn } from "./router-CdX15gXw.mjs";
import { f as Leaf } from "../_libs/lucide-react.mjs";
function BonsaiPhoto({
  photoId,
  className,
  fallbackClassName
}) {
  const [blob, setBlob] = reactExports.useState();
  reactExports.useEffect(() => {
    let cancelled = false;
    if (!photoId) {
      setBlob(void 0);
      return;
    }
    getPhotoBlob({ storagePath: photoId }).then((blob2) => {
      if (!cancelled) setBlob(blob2);
    }).catch(() => {
      if (!cancelled) setBlob(void 0);
    });
    return () => {
      cancelled = true;
    };
  }, [photoId]);
  const url = useBlobUrl(blob);
  if (!url) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(
          "flex items-center justify-center bg-gradient-to-br from-secondary via-muted to-sage/30 text-muted-foreground",
          fallbackClassName ?? className
        ),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "h-8 w-8 opacity-40" })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url, alt: "", loading: "lazy", decoding: "async", className });
}
export {
  BonsaiPhoto as B
};
