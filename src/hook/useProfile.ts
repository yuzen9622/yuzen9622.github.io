import { ProfileProviderContext } from "@/components/provider/ProfileContextProvider";
import { useContext } from "react";

export const useProfile = () => {
  const context = useContext(ProfileProviderContext);
  if (context === undefined)
    throw new Error("useProfile must be used within a ProfileProvider");

  return context;
};
