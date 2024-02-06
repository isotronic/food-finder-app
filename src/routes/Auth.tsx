import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import AuthForm from "../components/AuthForm";
import HeaderSEO from "../components/HeaderSEO";

export default function Auth() {
  const { authMethod } = useParams();

  return (
    <>
      <HeaderSEO
        title="Authentication"
        description="Login or register to customise your search experience."
      />
      <Container maxWidth="sm">
        <AuthForm authMethod={authMethod} />
      </Container>
    </>
  );
}
