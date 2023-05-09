import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  img {
    width: 50px;
    height: 50px;
  }
`;

const Navbar = () => {
  return (
    <Container>
      <a href={'https://hyro.agency'}>
        <img src={'/logo.svg'} alt={'logo'} />
      </a>
    </Container>
  );
};

export default Navbar;
