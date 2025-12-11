import { createContext } from "react";
import type { ProfileProviderState } from "@/shared/types";
export const ProfileProviderContext = createContext<
  ProfileProviderState | undefined
>(undefined);
