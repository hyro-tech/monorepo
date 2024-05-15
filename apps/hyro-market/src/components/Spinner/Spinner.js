import React from 'react';
import styled from 'styled-components';
import BootstrapSpinner from 'react-bootstrap/Spinner';

const StyledSpinner = styled(BootstrapSpinner)`
  margin-right: 10px;
  padding: 1rem;
`;

const Spinner = ({ small }) => {
  return (
    <StyledSpinner animation="border" role="status" size={small && 'sm'}>
      <span className="visually-hidden">Loading...</span>
    </StyledSpinner>
  );
};

export default Spinner;
