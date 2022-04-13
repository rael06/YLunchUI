import { Card, CardContent, Container, Typography } from "@mui/material";
import RegistrationForm from "./RegistrationForm";

export default function Registration() {
  return (
    <Container maxWidth="lg">
      <Typography mb={2} variant="h2" component="h1">
        Inscription
      </Typography>
      <Card>
        <Container maxWidth="md">
          <CardContent>
            <RegistrationForm />
          </CardContent>
        </Container>
      </Card>
    </Container>
  );
}
