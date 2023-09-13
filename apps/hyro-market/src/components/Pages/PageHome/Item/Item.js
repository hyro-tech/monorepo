import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { getItemsPictures } from '../../../../actions/items';
import { deviceMedia, deviceSizes } from '../../../../styles/helper';

const StyledItem = styled.div`
  font-family: Montserrat, sans-serif;
  word-break: break-word;
  max-width: 300px;
  overflow: hidden;
  cursor: ${(props) => (props.onClick ? 'pointer' : 'normal')};

  h5 {
    margin: 0;
    font-size: 20px;
  }

  p {
    margin: 0;
    font-size: 16px;
    font-weight: 300;
  }

  ${deviceMedia[deviceSizes.phone]`
    max-width: 160px;
    
    h5 {
      margin-top: 5px;
      font-size: 16px;
    }
    
    p {
      font-size: 12px;
      line-height: 16px;  
      text-overflow: ellipsis;
      overflow: hidden;
    }
  `};
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

  ${deviceMedia[deviceSizes.phone]`
    width: 160px;
    height: 160px;
    margin-bottom: 0px;
    padding: 5px;
  `};
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;

  span {
    text-decoration: line-through;
    font-size: 13px;
  }

  p {
    margin: 0;
    font-weight: 700;
    font-size: 18px;
    line-height: 18px;
  }

  ${deviceMedia[deviceSizes.phone]`
    p {
      font-size: 14px;
    }
    span {
      font-size: 12px;
    }
  `};
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
          <h5>{item?.brands[0] || 'Other'}</h5>
          <div style={{ height: '32px' }}>
            <p>{item?.title}</p>
          </div>
          <Price>
            <p>
              {item?.rental_price || 'n.a'} {item?.rental_price > 0 && '€'}
            </p>
            <span>{item?.price > 0 ? `${item?.price}€` : 'n.a'}</span>
          </Price>
        </StyledItem>
      </a>
    </Link>
  );
};

export default Item;
