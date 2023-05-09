import React from 'react';
import BootstrapSpinner from 'react-bootstrap/Spinner';

const Spinner = () => {
  return (
    <BootstrapSpinner animation="border" role="status" size={'sm'}>
      <span className="visually-hidden">Loading...</span>
    </BootstrapSpinner>
  );
};

export default Spinner;
