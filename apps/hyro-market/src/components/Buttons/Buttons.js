import styled from 'styled-components';

import theme from '../../styles/theme';

export const Button = styled.button`
  color: ${(props) => props.color || 'black'};
  font-weight: ${theme.font.weight.bold};
  font-size: ${(props) => (props.small ? '14' : '16')}px;
  background-color: ${(props) => props.bgColor || 'white'};
  width: ${(props) => (props.full ? '100%' : 'fit-content')};
  min-width: 200px;
  max-width: 400px;
  height: 48px;
  border: 1px solid black;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.disabled
      ? `
        background: gray;
      `
      : `
        &:active {
          border: none;
        }
  `};

  transition: 0.3s;
`;
