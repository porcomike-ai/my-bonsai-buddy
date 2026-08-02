import { createContext, useContext } from "react";

/** Hauteur px du header AppShell — source fiable pour position:sticky (surtout Android/tablette). */
export const HeaderHeightContext = createContext(72);

export function useHeaderHeight() {
  return useContext(HeaderHeightContext);
}
