import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import Navbar from '../../components/Navbar/Navbar';
import { deviceMedia, deviceSizes } from '../../styles/helper';
import { PATHS } from '../../utils';

const PageContainer = styled.div`
  height: 100vh;
`;

const Scratch = styled.img`
  width: 100%;
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

const Logo = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  position: absolute;
  left: 20px;
  top: 20px;
`;

const LayoutWithHeader = ({ withDressing = true, withBackLink = false, children }) => {
  return (
    <div>
      <PageContainer>
        {withDressing && (
          <>
            <Header>
              <h1>Le dressing</h1>
            </Header>
            <Scratch src={'/scratch.svg'} />

            <Link href={PATHS.HOME}>
              <Logo src={'/logo-white.svg'} alt={'logo'} />
            </Link>
          </>
        )}

        {children}
      </PageContainer>
    </div>
  );
};

export default LayoutWithHeader;
