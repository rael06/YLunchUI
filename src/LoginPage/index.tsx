import { Button, TextField } from "@material-ui/core";
import React from "react";
import classes from "./styles.module.scss";

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleClick() {
    console.log(email);
    console.log(password);
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
