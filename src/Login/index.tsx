import { TextField } from "@mui/material";
import React from "react";
import { useMutation } from "react-query";
import { loginApi } from "../services/api";
import { ApiError, LoginRequestDto } from "../services/api/types";
import ProgressButton, {
  ProgressButtonStatus,
} from "../shared/components/ProgressButton";
import classes from "./styles.module.scss";

export default function Login() {
  const [email, setEmail] = React.useState("admin@restaurant.com");
  const [password, setPassword] = React.useState("Password1234.");
  const [status, setStatus] = React.useState<ProgressButtonStatus>("idling");

  const mutation = useMutation((login: LoginRequestDto) => loginApi(login), {
    onSuccess: () => {
      // Todo redirection based on role
      setTimeout(() => {
        setStatus("error");
      }, 2000);
    },
    onError: (error: ApiError) => {
      // Todo process error
      setStatus("error");
    },
    onSettled: () => {
      setTimeout(() => {
        setStatus("idling");
      }, 500);
    },
  });

  function handleClick() {
    const body = { email, password };
    setStatus("loading");
    mutation.mutate(body);
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.field}>
        <TextField
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
        />
      </div>

      <div className={classes.field}>
        <TextField
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Mot de passe"
          type="password"
        />
      </div>

      <div className={classes.button}>
        <ProgressButton
          label="Confirmer"
          onClick={handleClick}
          status={status}
        />
      </div>
    </div>
  );
}
