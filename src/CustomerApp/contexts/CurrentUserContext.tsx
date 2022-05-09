import React from "react";
import { useMutation } from "react-query";
import {
  LoginRequestDto,
  UserReadDto,
} from "../../common/models/Authentication";
import { ApiError } from "../../common/models/Common";
import {
  loginApi,
  getCurrentUserApi,
} from "../../common/services/api/authentication";

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

  useMutation("user", (data: LoginRequestDto) => loginApi(data), {
    onSuccess: async () => {
      setCurrentUser(await getCurrentUserApi());
    },
  });

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser }}
      {...props}
    ></CurrentUserContext.Provider>
  );
};
