import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';

import LayoutWithSidebar from '../src/layouts/LayoutWithSidebar/LayoutWithSidebar';
import { PATHS } from '../src/utils';
import Actions from '../src/components/Actions/Actions';
import { getHack, updateHack } from '../src/actions/hack';
import ModalContent from '../src/components/Modals/ModalContent/ModalContent';

const StyledRow = styled(Row)`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: ${(props) => props.i % 2 === 0 && '#F2F2F2'};
`;

const Brands = () => {
  const [hack, setHack] = useState(null);
  const [createHack, setCreateHack] = useState(null);

  useEffect(() => {
    getHack().then(setHack);
  }, []);

  return (
    <LayoutWithSidebar path={PATHS.BRANDS}>
      <Actions>
        <div />

        <button onClick={() => setCreateHack(true)}>Ajouter</button>
      </Actions>

      <Row style={{ padding: '10px', marginBottom: '10px' }}>
        <Col>Marque</Col>
      </Row>

      {hack?.brands?.map((brand, i) => (
        <StyledRow i={i} key={brand}>
          <Col>{brand}</Col>
        </StyledRow>
      ))}

      {createHack && (
        <ModalContent
          items={hack?.brands}
          slug={'brands'}
          update={(changes) =>
            updateHack(changes).then((newHack) => {
              setHack(newHack);
              setCreateHack(false);
            })
          }
          handleClose={() => setCreateHack(false)}
        />
      )}
    </LayoutWithSidebar>
  );
};

export default Brands;
