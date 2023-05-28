import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  border-bottom: 1px solid #141414;
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const BackLink = styled.img`
  position: absolute;
  left: 40px;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const Navbar = ({ withBackLink = false }) => {
  return (
    <Container>
      {withBackLink && <BackLink src={'/arrow.svg'} onClick={() => window?.close()} />}
      <a href={'https://hyro.agency'}>
        <Logo src={'/logo.svg'} alt={'logo'} />
      </a>
    </Container>
  );
};

export default Navbar;
