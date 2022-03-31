import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Login from "../Login";
import Registration from "../Registration";
import Restaurants from "../Restaurants";

export default function Body() {
  return (
    <Container maxWidth="lg">
      <Routes>
        <Route path="" element={<Restaurants />} />
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
      </Routes>
    </Container>
  );
}
