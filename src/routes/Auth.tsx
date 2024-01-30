import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import AuthForm from "../components/AuthForm";

export default function Auth() {
  const { authMethod } = useParams();

  return (
    <Container maxWidth="sm">
      <AuthForm authMethod={authMethod} />
    </Container>
  );
}
