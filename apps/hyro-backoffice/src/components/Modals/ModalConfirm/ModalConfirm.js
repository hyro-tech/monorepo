import React from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';

import { Button } from '../../Button';

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 40px 0 40px;

  h4 {
    margin: 0;
  }

  img {
    height: 16px;
    cursor: pointer;
  }
`;

const Content = styled.div`
  padding: 40px;

  h6 {
    margin-bottom: 10px;
  }
`;

const ModalConfirm = ({ action, handleClose }) => {
  return (
    <Modal show centered size="xs" onHide={() => null}>
      <Header>
        <h4>Vous êtes sûr ?</h4>
        <img src={'/x.svg'} alt={'close'} onClick={handleClose} />
      </Header>
      <Content>
        <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <Button style={{ background: 'none' }} onClick={handleClose}>
            Annuler
          </Button>
          <Button
            onClick={() => {
              action();
              handleClose();
            }}
          >
            Confirmer
          </Button>
        </div>
      </Content>
    </Modal>
  );
};

export default ModalConfirm;
