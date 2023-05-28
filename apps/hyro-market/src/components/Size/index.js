import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.selected ? 'black' : '#d2d1d1')};
  border: 1px solid ${(props) => (props.selected ? 'black' : '#d2d1d1')};
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
