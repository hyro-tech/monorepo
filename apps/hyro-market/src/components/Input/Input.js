import React from 'react';
import styled from 'styled-components';

import theme from '../../styles/theme';

const Container = styled.div`
  position: relative;
  padding-bottom: 10px;
  border-bottom: 1px solid black;
  margin-bottom: 30px;
  width: 100%;
  height: 34px;

  input::placeholder {
    color: black;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  font-size: ${theme.font.medium};
  padding-right: 20px;
  width: 100%;
  ${(props) => props.disabled && 'background: none'};
  background: transparent;
`;

const Input = ({ type, value, onChange, placeholder, disabled }) => {
  return (
    <Container disabled={disabled}>
      <StyledInput
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </Container>
  );
};

export default Input;
