import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import capitalize from 'lodash';

import * as theme from '../../../styles/theme';
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

const Input = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  position: relative;
  border: none;
  border-bottom: 1px solid ${theme.colors.grayBorder};
  width: 100%;
  height: 34px;
  outline: none;
`;

const ModalContent = ({ items, slug, update, handleClose }) => {
  const [name, setName] = useState('');

  return (
    <Modal show centered size="lg" onHide={() => null}>
      <Header>
        <h4>Ajouter</h4>
        <img src={'/x.svg'} alt={'close'} onClick={() => handleClose()} />
      </Header>
      <Content>
        <div style={{ marginBottom: '0px' }}>
          <h6>Nom:</h6>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <Button style={{ background: 'none' }} onClick={handleClose}>
            Fermer
          </Button>
          <Button
            disabled={!name || items?.find((b) => b === name)}
            onClick={() =>
              update({
                [slug]: [...items, capitalize(name)],
              })
            }
          >
            Ajouter
          </Button>
        </div>
      </Content>
    </Modal>
  );
};

export default ModalContent;
