import { Card, CardContent, Container, Typography } from "@mui/material";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <>
      <Typography gutterBottom variant="h2" component="h1">
        Connexion
      </Typography>
      <Card>
        <Container maxWidth="md">
          <CardContent>
            <LoginForm />
          </CardContent>
        </Container>
      </Card>
    </>
  );
}
