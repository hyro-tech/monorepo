import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';

import LayoutWithSidebar from '../src/layouts/LayoutWithSidebar/LayoutWithSidebar';
import { PATHS } from '../src/utils';
import { getItemsFiltered, getItemsPictures } from '../src/actions/items';
import Actions from '../src/components/Actions/Actions';
import theme from '../src/styles/theme';
import ModalCreateAndModifyItem from '../src/components/Modals/ModalCreateAndModifyItem/ModalCreateAndModifyItem';
import Pagination from '../src/components/Pagination/Pagination';

const Picture = styled.img`
  width: 80px;
  height: 80px;
`;

const StyledRow = styled(Row)`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: ${(props) => props.i % 2 === 0 && '#F2F2F2'};
  cursor: pointer;
`;

const ColorsContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const Color = styled.div`
  width: 12px;
  height: 12px;
  border: 1px solid ${theme.colors.grayBorder};
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const Item = ({ item, i, select }) => {
  const [picture, setPicture] = useState(null);

  useMemo(() => {
    getItemsPictures(item?._id).then(({ response: pictures }) => {
      setPicture(pictures[0]);
    });
  }, [item]);

  return (
    <StyledRow i={i} onClick={() => select(item)}>
      <Col xs={2}>
        <Picture src={picture?.path} alt={picture?.name} />
      </Col>
      <Col xs={2}>{item?.reference}</Col>
      <Col xs={2}>
        <ColorsContainer>
          {item?.colors?.map((color) => (
            <Color key={item._id + color} color={color} />
          ))}
        </ColorsContainer>
      </Col>
      <Col>{item?.title}</Col>
    </StyledRow>
  );
};

const Items = () => {
  const dispatch = useDispatch();

  const items = useSelector((store) => store.items);

  const [selectedItem, setSelectedItem] = useState(null);

  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getItemsFiltered());
  }, []);

  const [page, setPage] = useState(0);
  const perPage = 9;

  const [itemsRendered, setItemsRendered] = useState([]);

  useMemo(() => {
    if (items) {
      setItemsRendered([...items].slice(page * perPage, page * perPage + perPage));
    }
  }, [page, items]);

  useMemo(() => {
    if (search) {
      setItemsRendered(
        items.filter((item) => item.reference?.toLowerCase()?.includes(search?.toLowerCase())),
      );
    } else if (items) {
      setItemsRendered([...items].slice(page * perPage, page * perPage + perPage));
    }
  }, [search]);

  return (
    <LayoutWithSidebar path={PATHS.ITEMS}>
      <Actions>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: 'auto', gap: '20px' }}>
          <span>Référence:</span>
          <input
            style={{
              border: `1px solid black`,
              borderRadius: '35px',
              padding: '6px 20px',
              outline: 'none',
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button onClick={() => setSelectedItem({})}>Ajouter</button>
      </Actions>

      <Row style={{ padding: '10px', marginBottom: '10px' }}>
        <Col xs={2}>Image</Col>
        <Col xs={2}>Référence</Col>
        <Col xs={2}>Couleurs</Col>
        <Col>Nom</Col>
      </Row>

      {itemsRendered?.map((item, i) => (
        <Item item={item} key={item._id} i={i} select={setSelectedItem} />
      ))}

      {!search && (
        <Pagination
          currentPage={page}
          totalPages={items?.length / perPage}
          onPageChange={setPage}
        />
      )}

      {selectedItem && (
        <ModalCreateAndModifyItem item={selectedItem} handleClose={() => setSelectedItem(null)} />
      )}
    </LayoutWithSidebar>
  );
};

export default Items;
