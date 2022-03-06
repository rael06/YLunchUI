import { Button, TextField } from "@material-ui/core";
import React from "react";
import classes from "./styles.module.scss";

export default function LoginPage() {
  const [email, setEmail] = React.useState("admin@restaurant.com");
  const [password, setPassword] = React.useState("Password1234.");

  function handleClick() {
    console.log(email);
    console.log(password);
    const body = { email, password };
    fetch("https://ylunch-api.rael-calitro.ovh/authentication/login", {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(body),
    });
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
