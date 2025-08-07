import { useContext } from "react";

import { ProfileProviderContext } from "@/provider/ProfileContextProvider";

export const useProfile = () => {
  const context = useContext(ProfileProviderContext);
  if (context === undefined)
    throw new Error("useProfile must be used within a ProfileProvider");

  return context;
};
