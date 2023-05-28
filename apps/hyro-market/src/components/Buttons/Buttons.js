import styled from 'styled-components';

import { deviceMedia, deviceSizes } from '../../styles/helper';

export const Button = styled.button`
  color: ${(props) => props.color || 'white'};
  font-size: ${(props) => (props.small ? '14' : '16')}px;
  background-color: ${(props) => props.bgColor || '#141414'};
  width: ${(props) => (props.full ? '100%' : 'fit-content')};
  min-width: 200px;
  max-width: 400px;
  padding: 0 40px;
  height: 50px;
  border: 1px solid black;
  border-radius: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 20px;
  font-weight: 400;
  line-height: 20px;
  font-family: Montserrat, sans-serif;
  text-align: center;
  text-transform: uppercase;

  img {
    height: 23px;
  }

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

  ${deviceMedia[deviceSizes.phone]`
    width: 100%;
  `};

  transition: 0.3s;
`;
