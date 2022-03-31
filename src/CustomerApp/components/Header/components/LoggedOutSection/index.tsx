import { Link } from "react-router-dom";

export default function LoggedOutSection() {
  return (
    <div style={{ display: "flex" }}>
      <Link to="registration">S'enregistrer</Link>
      <Link to="login">Connexion</Link>
    </div>
  );
}
