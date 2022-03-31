import React from "react";
import { UserReadDto } from "../../common/models/Authentication";

type CurrentUserContextType = {
  currentUser: UserReadDto | undefined;
  setCurrentUser: (currentUser?: UserReadDto) => void;
};

export const CurrentUserContext = React.createContext<CurrentUserContextType>({
  currentUser: undefined,
  setCurrentUser: (_?: UserReadDto): void => {},
});

export const CurrentUserProvider: React.FC = (props) => {
  const [currentUser, setCurrentUser] = React.useState<UserReadDto>();

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser }}
      {...props}
    ></CurrentUserContext.Provider>
  );
};
