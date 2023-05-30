import React from 'react';
import styled from 'styled-components';

import theme from '../../styles/theme';

const Container = styled.div`
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.selected ? 'black' : theme.colors.gray)};
  border: 1px solid ${(props) => (props.selected ? 'black' : theme.colors.gray)};
  border-radius: 50%;
  padding: 10px;
  font-size: 12px;
  cursor: pointer;
`;

const Size = ({ children, selected, onClick }) => {
  return (
    <Container selected={selected} onClick={onClick}>
      {children}
    </Container>
  );
};

export default Size;
