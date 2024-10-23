import React, { useState } from "react";
import {
  Container,
  Content,
  ContentLogo,
  ContentSearch,
  ContentUser,
  ContentUserLink,
  Icon,
  Logo,
  UserButton,
} from "./styles";
import Search from "../search";

const Header: React.FC = () => {
  return (
    <Container>
      <Content>
        <ContentLogo>
          <Logo href="/">
            <img
              src="https://s3-sa-east-1.amazonaws.com/files.arvoredelivros.com.br/arvore-library-assets/images/logos/logo-livros-horizontal-white.svg"
              alt="Arvore Livros"
              width="160"
              height="25"
            />
          </Logo>
        </ContentLogo>
        <ContentSearch>
          <Search />
          <UserButton>
            <Icon />
          </UserButton>
        </ContentSearch>
        <ContentUser>
          <ContentUserLink>Login</ContentUserLink>
        </ContentUser>
      </Content>
    </Container>
  );
};

export default Header;
