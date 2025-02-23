import { useContext } from "react";
import { UserContext } from "./UserContext";

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext debe ser usado en UserProvider.');
  }
  return context;
}
