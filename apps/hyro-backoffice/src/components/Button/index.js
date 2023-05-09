import styled from 'styled-components';

import theme from '../../styles/theme';

export const Button = styled.button`
  width: 200px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  padding: 0 20px;
  color: black;
  background-color: ${theme.colors.blueDeep};
  border: 1px solid ${theme.colors.grayBorder};

  ${(props) =>
    props.disabled &&
    `
        background-color: ${theme.colors.grayBorder};
  `};

  div {
    margin-right: 10px;
  }
`;
