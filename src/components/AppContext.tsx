import { createContext, useState } from "react";
import { RightHeaderProps } from "./RightHeader";

export const context = createContext<any>({});

function AppProvider({ children }: any) {
  const [user, setUser] = useState<RightHeaderProps>({
    userId: 0,
    username: "",
    userHeaderURL: "",
  });

  return (
    <context.Provider value={{ user, setUser }}>{children}</context.Provider>
  );
}

export default AppProvider;
