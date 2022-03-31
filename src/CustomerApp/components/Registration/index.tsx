import { Typography, Card, CardContent, Container } from "@mui/material";
import RegistrationForm from "./RegistrationForm";

export default function Registration() {
  return (
    <>
      <Typography gutterBottom variant="h2" component="h1">
        Inscription
      </Typography>
      <Card>
        <Container maxWidth="md">
          <CardContent>
            <RegistrationForm />
          </CardContent>
        </Container>
      </Card>
    </>
  );
}
