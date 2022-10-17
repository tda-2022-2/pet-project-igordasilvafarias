import { useState } from "react";
import { Container } from "./styles";

import { FlatList } from "react-native";
import { Header } from "@components/Header";
import { GroupCard } from "@components/GroupCard";
import { Highlight } from "@components/Highlight";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

export function Group() {
  const [groups, setGroups] = useState<string[]>([]);

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subTitle="jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => 
          <GroupCard 
            title={item} 
          />
        }
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() =><ListEmpty message="Lista Vazia"/>}
      />

      <Button 
        title="Criar nova turma"
      />

    </Container>
  );
}
