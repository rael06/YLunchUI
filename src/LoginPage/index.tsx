import { Button, TextField } from "@material-ui/core";
import React from "react";
import { useMutation } from "react-query";
import { loginApi } from "../services/api";
import {
  ApiError,
  isValidationError,
  LoginRequestDto,
} from "../services/api/types";
import classes from "./styles.module.scss";

export default function LoginPage() {
  const [email, setEmail] = React.useState("admin@restaurant.com");
  const [password, setPassword] = React.useState("Password1234.");

  const mutation = useMutation((login: LoginRequestDto) => loginApi(login), {
    onSuccess: () => {
      console.log("success");
    },
    onError: (error: ApiError) => {
      if (isValidationError(error)) console.log(error.errors);
      else console.log(error.message);
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
        label="Password"
        type="password"
      />

      <Button onClick={handleClick}>Confirmer</Button>
    </div>
  );
}
