import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Container } from "./styles";

export function Group() {
  return (
    <Container>
      <Header showBackButton/>
      <Highlight 
        title="Turmas" 
        subTitle="jogue com a sua turma" 
      />
    </Container>
  );
}
