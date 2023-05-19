import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { getItemsPictures } from '../../../../actions/items';
import { translation } from '../../../../../../../libs/translations';

const StyledItem = styled.div`
  font-family: Montserrat, sans-serif;
  word-break: break-word;
  max-width: 300px;
  overflow: hidden;
  cursor: ${(props) => (props.onClick ? 'pointer' : 'normal')};

  h5 {
    margin: 0;
  }

  p {
    margin: 0;
    font-size: 16px;
    font-weight: 400;
  }
`;

const ItemImageContainer = styled.div`
  width: 300px;
  height: 300px;
  background-color: #f3f3f5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin-bottom: 10px;

  img {
    height: 100%;
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;

  span {
    text-decoration: line-through;
  }

  p {
    margin: 0;
    font-weight: 700;
    font-size: 18px;
  }
`;

const Item = ({ item }) => {
  const [picture, setPicture] = useState(null);

  useMemo(() => {
    getItemsPictures(item._id).then(({ response: pictures }) => {
      if (pictures) {
        setPicture(pictures[0]);
      }
    });
  }, [item]);

  return (
    <Link href={`/items/${item._id}`} passHref>
      <a target="_blank" rel="noopener noreferrer">
        <StyledItem>
          <ItemImageContainer>
            <img src={picture?.path} alt={picture?.name} />
          </ItemImageContainer>
          <h5>{translation(`brands.${item?.brands[0]}`)}</h5>
          <p>{item?.title}</p>
          <Price>
            <span>{item?.price} €</span>
            <p>{item?.rental_price} €</p>
          </Price>
        </StyledItem>
      </a>
    </Link>
  );
};

export default Item;
