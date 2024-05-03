import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import LayoutWithSidebar from '../src/layouts/LayoutWithSidebar/LayoutWithSidebar';
import { PATHS } from '../src/utils';
import { deleteItem, getItemsFiltered, getItemsPictures } from '../src/actions/items';
import Actions from '../src/components/Actions/Actions';
import ModalCreateAndModifyItem from '../src/components/Modals/ModalCreateAndModifyItem/ModalCreateAndModifyItem';
import Pagination from '../src/components/Pagination/Pagination';
import { translation } from '../../../libs/translations';
import { getHack } from '../src/actions/hack';
import ModalConfirm from '../src/components/Modals/ModalConfirm/ModalConfirm';
import { colors } from '../src/styles/theme';

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

const Item = ({ item, i, select }) => {
  const [remove, setRemove] = useState(false);

  const [picture, setPicture] = useState(null);

  const dispatch = useDispatch();

  useMemo(() => {
    getItemsPictures(item?._id).then(({ response: pictures }) => {
      setPicture(pictures[0]);
    });
  }, [item]);

  return (
    <>
      <StyledRow i={i}>
        <Col xs={1} onClick={() => select(item)}>
          <Picture src={picture?.path} alt={picture?.name} />
        </Col>
        <Col xs={1} onClick={() => select(item)}>
          {item?.reference}
        </Col>
        <Col xs={1} onClick={() => select(item)}>
          {item?.rental_price} -{' '}
          <span style={{ textDecoration: 'line-through' }}>{item?.price}</span>
        </Col>
        <Col xs={1} onClick={() => select(item)}>
          {item?.reversal || 0}
        </Col>
        <Col xs={1} onClick={() => select(item)}>
          {item?.brands[0]}
        </Col>
        <Col xs={2} onClick={() => select(item)}>
          {item?.categories[0]}
        </Col>
        <Col xs={1} onClick={() => select(item)}>
          <ColorsContainer>
            {item?.sizes?.map((size) => translation(`sizes.${size}`))?.join(', ')}
          </ColorsContainer>
        </Col>
        <Col xs={1} onClick={() => select(item)}>
          <ColorsContainer>{item?.colors?.join(', ')}</ColorsContainer>
        </Col>
        <Col onClick={() => select(item)}>{item?.title}</Col>
        <Col onClick={() => select(item)}>{item?.commentary}</Col>
        <Col>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              style={{
                width: 'fit-content',
                backgroundColor: colors.gray,
                color: 'white',
                fontSize: '10px',
              }}
              onClick={() => select({ ...item, _id: null })}
            >
              Dupliquer
            </button>
            <button
              style={{
                width: 'fit-content',
                backgroundColor: colors.red,
                color: 'white',
                fontSize: '10px',
              }}
              onClick={() => setRemove(true)}
            >
              Supprimer
            </button>
          </div>
        </Col>
      </StyledRow>
      {remove && (
        <ModalConfirm
          action={() => dispatch(deleteItem(item?._id)).then(() => toast.success('Item supprimé'))}
          handleClose={() => setRemove(false)}
        />
      )}
    </>
  );
};

const Items = ({ page }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: items, maxPage } = useSelector((store) => store.items);

  const [selectedItem, setSelectedItem] = useState(null);

  const [hack, setHack] = useState(null);

  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getItemsFiltered(page));
  }, [page]);

  useEffect(() => {
    getHack().then(setHack);
  }, []);

  const setPage = (newPage) => {
    const newQuery = { ...router.query, page: newPage };
    router.replace({ query: newQuery });
  }

  const [itemsRendered, setItemsRendered] = useState([]);

  const isInTitle = (item, word) => item.title?.toLowerCase()?.includes(word?.toLowerCase());
  const isInReference = (item, word) =>
    item.reference?.toLowerCase()?.includes(word?.toLowerCase());
  const isInBrands = (item, word) =>
    item.brands
      ?.map((b) => b?.toLowerCase())
      ?.join(' ')
      ?.includes(word?.toLowerCase());
  const isInCategory = (item, word) =>
    item.categories
      ?.map((b) => b?.toLowerCase())
      ?.join(' ')
      ?.includes(word?.toLowerCase());

  useMemo(() => {
    if (items) setItemsRendered([...items]);
  }, [items]);

  useMemo(() => {
    if (search) {
      const words = search.split(' ');

      setItemsRendered(
        items?.filter((item) =>
          words?.some(
            (w) =>
              isInReference(item, w) ||
              isInBrands(item, w) ||
              isInCategory(item, w) ||
              isInTitle(item, w),
          ),
        ),
      );
      setPage(1);
    } else {
      setItemsRendered(items);
    }
  }, [search]);

  const handleCloseModal = () => {
    setSelectedItem(null);
  }
  
  const handleFinishMutation = () => {
    setSelectedItem(null);
    setPage(1);
  } 

  return (
    <LayoutWithSidebar path={PATHS.ITEMS}>
      <Actions>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: 'auto', gap: '20px' }}>
          <input
            placeholder={'Recherche...'}
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
        <Col xs={1}>Image</Col>
        <Col xs={1}>Référence</Col>
        <Col xs={1}>Prix</Col>
        <Col xs={1}>Reversé</Col>
        <Col xs={1}>Marque</Col>
        <Col xs={2}>Catégorie</Col>
        <Col xs={1}>Tailles</Col>
        <Col xs={1}>Couleurs</Col>
        <Col>Nom</Col>
        <Col>Commentaire</Col>
        <Col>Actions</Col>
      </Row>

      {itemsRendered
        ?.map((item, i) => (
          <Item item={item} key={item._id} i={i} select={setSelectedItem} />
        ))}

      <Pagination
        currentPage={page - 1}
        totalPages={maxPage}
        onPageChange={page => setPage(page + 1)}
      />

      {selectedItem && (
        <ModalCreateAndModifyItem
          hack={hack}
          item={selectedItem}
          itemsLength={items?.length}
          handleClose={handleCloseModal}
          onFinishMutation={handleFinishMutation}
        />
      )}
    </LayoutWithSidebar>
  );
};

export function getServerSideProps({ query }) {
  return {
    props: {
      page: Number(query.page) || 1,
    },
  };
}

export default Items;
