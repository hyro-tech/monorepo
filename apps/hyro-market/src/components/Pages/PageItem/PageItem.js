import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { getItemsPictures } from '../../../actions/items';
import LayoutWithHeader from '../../../layouts/LayoutWithHeader/LayoutWithHeader';
import { translation } from '../../../../../../libs/translations';
import { deviceMedia, deviceSizes } from '../../../styles/helper';
import { Button } from '../../Buttons/Buttons';

const Main = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 40px;
  padding: 20px;
  height: 80vh;

  ${deviceMedia[deviceSizes.phone]`
    padding: 0 20px;
    height: 100%;
    flex-wrap: wrap;
    justify-content: center;
  `};
`;

const MainLeft = styled.div`
  width: 400px;

  ${deviceMedia[deviceSizes.phone]`
    margin-top: 20px;
  `};
`;

const MainRight = styled.div`
  width: 400px;

  h5 {
    margin: 0;
  }

  p {
    margin: 0;
  }

  ${deviceMedia[deviceSizes.phone]`
    text-align: center;
  `};
`;

const ItemImageContainer = styled.div`
  width: 400px;
  height: 400px;
  max-width: 100%;
  background-color: #f3f3f5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  img {
    height: 100%;
    max-width: 100%;
  }
`;

const OthersPictures = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
  flex-wrap: wrap;
  padding: 10px;

  div {
    width: 60px;
    height: 60px;
    background-color: #f3f3f5;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

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

const PageItem = ({ item }) => {
  const router = useRouter();

  const [mainPicture, setMainPicture] = useState(null);
  const [othersPictures, setOthersPictures] = useState([]);

  useMemo(() => {
    if (item) {
      getItemsPictures(item._id).then(({ response: pictures }) => {
        if (pictures) {
          setMainPicture(pictures[0]);
          setOthersPictures(pictures?.slice(1, pictures?.length));
        }
      });
    }
  }, [item]);

  return (
    <LayoutWithHeader>
      <Main>
        <MainLeft>
          <ItemImageContainer>
            <img src={mainPicture?.path} alt={mainPicture?.name} />
          </ItemImageContainer>
          {othersPictures?.length > 0 && (
            <OthersPictures>
              {othersPictures.map((pic) => (
                <div
                  key={pic}
                  onClick={() => {
                    setOthersPictures([...othersPictures, mainPicture]?.filter((p) => p !== pic));
                    setMainPicture(pic);
                  }}
                >
                  <img src={pic?.path} alt={pic?.name} />
                </div>
              ))}
            </OthersPictures>
          )}
        </MainLeft>
        <MainRight>
          <h5>{translation(`brands.${item?.brands[0]}`)}</h5>
          <p>{item?.title}</p>
          <Price>
            <span>{item?.price} €</span>
            <p>{item?.rental_price} €</p>
          </Price>

          <div style={{ marginTop: '20px' }}>
            <p>Tailles disponibles:</p>
            {item?.sizes?.map((size) => translation(`sizes.${size}`)).join(' - ')}
          </div>
          <div style={{ marginTop: '20px' }}>
            <p>Couleurs disponibles:</p>
            {item?.colors?.map((color) => translation(`colors.${color}`))?.join(' - ')}
          </div>

          <div style={{ marginTop: '40px' }}>
            <p>{item?.description}</p>
            <a
              href={`https://api.whatsapp.com/send?phone=33781530898&text=Hello Hyro, Je voudrais plus d'informations sur la location de cet article: ${
                item.title
              } (ref: ${item.reference}). URL: ${process.env.url + router.asPath}`}
              target={'_blank'}
              rel="noreferrer"
            >
              <Button>Louer</Button>
            </a>
          </div>
        </MainRight>
      </Main>
    </LayoutWithHeader>
  );
};

export default PageItem;
