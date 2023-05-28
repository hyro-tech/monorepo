import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { getItemsPictures } from '../../../actions/items';
import LayoutWithHeader from '../../../layouts/LayoutWithHeader/LayoutWithHeader';
import { translation } from '../../../../../../libs/translations';
import { deviceMedia, deviceSizes } from '../../../styles/helper';
import { Button } from '../../Buttons/Buttons';
import Size from '../../Size';

const Main = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 40px;
  padding: 20px;
  height: 80vh;
  margin-top: 80px;

  ${deviceMedia[deviceSizes.phone]`
    padding: 0 20px;
    height: 100%;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 0px;
  `};
`;

const MainLeft = styled.div`
  width: 400px;

  ${deviceMedia[deviceSizes.phone]`
    margin-top: 0px;
  `};
`;

const MainRight = styled.div`
  width: 400px;

  h5 {
    margin: 0;
    font-size: 30px;
  }

  p {
    margin: 0;
    font-size: 18px;
  }

  ${deviceMedia[deviceSizes.phone]`
    text-align: center;
    padding-bottom: 40px;
    padding-top: 20px;
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
    margin-bottom: 10px;
  }
`;

const OthersPictures = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  padding: 10px 0;

  div {
    width: 100px;
    height: 100px;
    background-color: #f3f3f5;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  img {
    height: 100%;
  }

  ${deviceMedia[deviceSizes.phone]`
    text-align: center;
    padding: 20px 20px 40px 20px;
  `};
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

  ${deviceMedia[deviceSizes.phone]`
    justify-content: center;
  `};
`;

const Infos = styled.div`
  text-align: start;
`;

const SizesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
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
    <LayoutWithHeader withDressing={false} withBackLink={true}>
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
            <p>{item?.rental_price} €</p>
          </Price>

          <Infos>
            {item?.commentary && (
              <div style={{ marginTop: '20px' }}>
                <span>{item?.commentary}</span>
              </div>
            )}
            <div style={{ marginTop: '20px' }}>
              <p>Prix neuf :</p>
              <span>{item?.price || 'n/a'} €</span>
            </div>
            <div style={{ marginTop: '20px' }}>
              <p>Prix de location :</p>
              <span>{item?.rental_price} €</span>
            </div>
            <div style={{ marginTop: '20px' }}>
              <p>Tailles disponibles:</p>
              <SizesContainer>
                {item?.sizes?.map((size) => (
                  <Size key={size} selected>
                    {translation(`sizes.${size}`)}
                  </Size>
                ))}
              </SizesContainer>
            </div>
            {item?.colors?.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <p>Couleurs disponibles:</p>
                {item?.colors?.map((color) => translation(`colors.${color}`))?.join(' - ')}
              </div>
            )}
          </Infos>

          <div style={{ marginTop: '40px' }}>
            <p>{item?.description}</p>
            <a
              href={`https://api.whatsapp.com/send?phone=33781530898&text=Hello Hyro, Je voudrais plus d'informations sur la location de cet article: ${
                item.title
              } (ref: ${item.reference}). URL: ${process.env.url + router.asPath}`}
              target={'_blank'}
              rel="noreferrer"
            >
              <Button>
                Louer maintenant <img src={'/whatsapp.png'} alt={'whatsapp'} />
              </Button>
            </a>
          </div>
        </MainRight>
      </Main>
    </LayoutWithHeader>
  );
};

export default PageItem;
