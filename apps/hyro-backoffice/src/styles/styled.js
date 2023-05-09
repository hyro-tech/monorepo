import styled, { css } from 'styled-components';

import { colors } from './theme';

export const underlineCss = css`
  background-color: ${colors.primary};
  width: fit-content;
  padding: 3px 12px;
`;

export const StyledTable = styled.table`
  th {
    padding: 10px;
  }
`;

export const StyledTr = styled.tr`
  width: 100%;
  td {
    padding: 10px;
  }

  background-color: ${(props) => (props.isColored ? 'gray' : '')};
`;
