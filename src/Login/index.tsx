import { Button, TextField } from "@mui/material";
import React from "react";
import { useMutation } from "react-query";
import { loginApi } from "../services/api";
import { ApiError, LoginRequestDto } from "../services/api/types";
import classes from "./styles.module.scss";

export default function Login() {
  const [email, setEmail] = React.useState("admin@restaurant.com");
  const [password, setPassword] = React.useState("Password1234.");

  const mutation = useMutation((login: LoginRequestDto) => loginApi(login), {
    onSuccess: () => {
      // Todo redirection based on role
    },
    onError: (error: ApiError) => {
      // Todo process error
    },
  });

  function handleClick() {
    const body = { email, password };
    mutation.mutate(body);
  }

  return (
    <div className={classes.wrapper}>
      <TextField
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
      />

      <TextField
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Mot de passe"
        type="password"
      />

      <Button onClick={handleClick}>Confirmer</Button>
    </div>
  );
}
