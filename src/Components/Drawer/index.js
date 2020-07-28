import React from "react";
import { DrawerItems } from "react-navigation";
import { useSelector } from "react-redux";

import { Container, Header, EnterpriseBrand } from "./styles";

export default function Drawer(props) {
  const enterprise = useSelector(state => state.enterprise);

  return (
    <Container>
      {enterprise && (
        <Header>
          <EnterpriseBrand
            source={{ uri: enterprise.brand }}
            resizeMode="contain"
          />
        </Header>
      )}

      <DrawerItems {...props} />
    </Container>
  );
}
