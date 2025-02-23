import { createContext, Dispatch, SetStateAction } from "react";

export interface UserInContext {
  id: string;
  username: string;
}

export const UserContext = createContext<{ user: UserInContext | null,
  setUser: Dispatch<SetStateAction<UserInContext | null>> } | undefined>(undefined);
