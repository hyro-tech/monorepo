import React from 'react';
import styled from 'styled-components';
import Image from 'react-bootstrap/Image';

import theme from '../../styles/theme';

const Container = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  cursor: ${(props) => (props.onClick ? 'pointer' : 'inherit')};
  font-size: ${theme.font.medium};
  font-weight: ${theme.font.weight.semiBold};
`;

const Icon = styled(Image)`
  height: 18px;
  margin-right: 10px;
`;

const IconAndLabel = ({ style, icon, onClick, children }) => {
  return (
    <Container onClick={onClick} style={style}>
      <Icon src={icon} />
      <span>{children}</span>
    </Container>
  );
};

export default IconAndLabel;
