import { createContext, useState } from "react";
import { RightHeaderProps } from "./rightHeader";

export const context = createContext<any>({});

function AppProvider({ children }: any) {
  const [user, setUser] = useState<RightHeaderProps>({
    userId: 0,
    username: "",
    userHeaderURL: "",
    infoCount: 0
  });

  return (
    <context.Provider value={{ user, setUser }}>{children}</context.Provider>
  );
}

export default AppProvider;
