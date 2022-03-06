import { Button } from "@material-ui/core";
import { TextField } from "material-ui";
import React from "react";
import classes from "./styles.module.scss";

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  function handleClick() {}
  return (
    <div className={classes.wrapper}>
      <TextField name="email">Email</TextField>
      <Button onClick={handleClick}>Confirmer</Button>
    </div>
  );
}
