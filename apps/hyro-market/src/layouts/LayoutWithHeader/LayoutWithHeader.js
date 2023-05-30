import React from 'react';
import styled from 'styled-components';

import Navbar from '../../components/Navbar/Navbar';
import { deviceMedia, deviceSizes } from '../../styles/helper';

const PageContainer = styled.div`
  height: 100vh;
`;

const Scratch = styled.img`
  width: 120%;
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background-color: #141414;

  h1 {
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    color: white;
    font-size: 40px;
    text-transform: uppercase;
    text-align: center;
  }

  ${deviceMedia[deviceSizes.phone]`
    height: 120px;
    
    h1 {
        font-size: 20px;
        top: 55%;
    }
  `};
`;

const LayoutWithHeader = ({ withDressing = true, withBackLink = false, children }) => {
  return (
    <div>
      <Navbar withBackLink={withBackLink} />
      <PageContainer>
        {withDressing && (
          <>
            <Header>
              <h1>Le dressing</h1>
            </Header>
            <Scratch src={'/scratch.svg'} />
          </>
        )}

        {children}
      </PageContainer>
    </div>
  );
};

export default LayoutWithHeader;
