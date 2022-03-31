import React from "react";
import { CurrentUserContext } from "./../../CustomerApp/contexts/CurrentUserContext";

export default function useCurrentUser() {
  const { currentUser, setCurrentUser } = React.useContext(CurrentUserContext);

  return { currentUser, setCurrentUser };
}
