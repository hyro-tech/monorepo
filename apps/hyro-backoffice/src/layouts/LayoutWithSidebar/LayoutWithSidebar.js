import React from 'react';
import styled from 'styled-components';

import Sidebar from '../../components/Sidebar/Sidebar';
import LayoutPermissions from '../LayoutPermissions/LayoutPermissions';

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const Content = styled.div`
  padding: 100px 40px;
  width: calc(100vw - 240px);
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
`;

const LayoutWithSidebar = ({ path, secondary, children }) => {
  return (
    <LayoutPermissions>
      <Container>
        <Sidebar path={path} secondary={secondary} />
        <Content>{children}</Content>
      </Container>
    </LayoutPermissions>
  );
};

export default LayoutWithSidebar;
