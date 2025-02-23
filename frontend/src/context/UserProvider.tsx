import { ReactNode, useState } from "react";
import { UserContext, UserInContext } from "./UserContext";

export const UserProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<UserInContext | null>({id: '', username: ''})

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}
