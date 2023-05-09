import styled from 'styled-components';
import Image from 'react-bootstrap/Image';

import theme from './theme';

const TableHeader = styled.div`
  display: flex;
  margin-bottom: 20px;

  p {
    margin: 0;
    font-weight: ${theme.font.weight.semiBold};
  }

  .container {
    margin: 0;
  }

  .col {
    padding-left: 0;
  }
`;

const Table = styled.div`
  p {
    margin: 0;
    filter: opacity(88%);
  }

  .container {
    margin: 0;
  }

  .col {
    padding-left: 0;
    display: flex;
    align-items: center;
    line-height: 1;
  }
`;

const Case = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const Line = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 56px;
  word-break: break-all;
`;

const LineColoration = styled.div`
  position: absolute;
  border-radius: ${theme.border.insane};
  background-color: rgba(251, 243, 173, 0.2);
  backdrop-filter: opacity(20%);
  width: calc(100% + 40px);
  height: 56px;
  z-index: -1;
  left: -20px;
`;

const LineActions = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const Icon = styled(Image)`
  height: 18px;
  margin-right: 20px;
  cursor: pointer;
`;

export const TableStyle = {
  TableHeader,
  Table,
  Case,
  Line,
  LineColoration,
  LineActions,
  Icon,
};

export default TableStyle;
