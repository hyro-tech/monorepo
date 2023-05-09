import React from 'react';
import styled from 'styled-components';

import Navbar from '../../components/Navbar/Navbar';

const PageContainer = styled.div`
  height: 100vh;
`;

const Scratch = styled.img`
  width: 100%;
`;

const Header = styled.div`
  position: relative;
  height: 500px;
  width: 100%;

  img {
    width: 100%;
    height: 100%;
  }

  h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    color: white;
    font-size: 60px;
    text-transform: uppercase;
  }
`;

const LayoutWithHeader = ({ children }) => {
  return (
    <div>
      <Navbar />
      <PageContainer>
        <Header>
          <h1>Notre dressing</h1>
          <img src={'/showroom.png'} alt={'showroom'} />
        </Header>
        <Scratch src={'/scratch.svg'} />

        {children}
      </PageContainer>
    </div>
  );
};

export default LayoutWithHeader;
