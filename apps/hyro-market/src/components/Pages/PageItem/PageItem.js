import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import ImageGallery from 'react-image-gallery';
import Link from 'next/link';
import { ArrowLeft } from 'react-bootstrap-icons';

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
  margin-top: 80px;

  ${deviceMedia[deviceSizes.phone]`
    padding: 0 20px;
    height: 100%;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 0px;
  `};
`;

const MainLeftMobile = styled.div`
  display: none;

  ${deviceMedia[deviceSizes.phone]`
      display: block;
  `};
`;

const MainLeft = styled.div`
  width: 400px;

  ${deviceMedia[deviceSizes.phone]`
    display: none;
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
    padding-bottom: ${(props) => (props.hasRelated ? 0 : 40)}px;
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
  justify-content: ${(props) => (props.alignStart ? 'start' : 'center')};
  gap: 10px;
  flex-wrap: wrap;
  padding: 10px 0;

  div {
    width: ${(props) => (props.big ? 200 : 100)}px;
    height: ${(props) => (props.big ? 200 : 100)}px;
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
    
    div {
      width: ${(props) => (props.big ? 160 : 100)}px;
      height: ${(props) => (props.big ? 160 : 100)}px;
    }
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

const OnlyDesktop = styled.div`
  text-align: center;

  ${deviceMedia[deviceSizes.phone]`
      display: none;
  `};
`;

const BackButton = styled.div`
  position: absolute;
  left: 0;
  top: -50px;
  cursor: pointer;
`;

const BackButtonMobile = styled.div`
  position: absolute;
  left: 1rem;
  top: 1rem;
  cursor: pointer;
  z-index: 99999;
`;

const PageItem = ({ item, related }) => {
  const router = useRouter();

  const [gallery, setGallery] = useState(null);
  const [mainPicture, setMainPicture] = useState(null);
  const [othersPictures, setOthersPictures] = useState([]);

  const handleClickBack = () => {
    router.back();
  };

  useMemo(() => {
    if (item) {
      getItemsPictures(item._id).then(({ response: pictures }) => {
        if (pictures) {
          setMainPicture(pictures[0]);
          setOthersPictures(pictures?.slice(1, pictures?.length));
          setGallery(pictures?.map((pic) => ({ original: pic.path, thumbnail: pic.path })));
        }
      });
    }
  }, [item]);

  return (
    <LayoutWithHeader withDressing={false} withBackLink={true}>
      <Main>
        <MainLeftMobile>
          <BackButtonMobile onClick={handleClickBack}>
            <ArrowLeft size={24} />
          </BackButtonMobile>
          {gallery && (
            <ImageGallery
              showNav={false}
              showBullets={true}
              showFullscreenButton={false}
              showThumbnails={false}
              showPlayButton={false}
              items={gallery}
              bulletClass={{ boxShadow: 'none' }}
            />
          )}
        </MainLeftMobile>
        <MainLeft style={{ position: 'relative' }}>
          <BackButton onClick={handleClickBack}>
            <ArrowLeft size={24} />
          </BackButton>
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
        <MainRight hasRelated={related?.length}>
          <p>{item?.title}</p>
          <span style={{ fontWeight: 600 }}>{item?.brands[0]}</span>

          <Infos>
            <div style={{ marginTop: '20px' }}>
              <p>Prix neuf :</p>
              <span>
                {item?.price || 'n.a'} {item?.price > 0 && '€'}
              </span>
            </div>
            <div style={{ marginTop: '20px' }}>
              <p>Prix de location :</p>
              <span style={{ fontWeight: '600' }}>
                {item?.rental_price || 'n.a'} {item?.rental_price > 0 && '€'}
              </span>
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
            {/*item?.colors?.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <p>Couleurs disponibles:</p>
                {item?.colors?.map((color) => translation(`colors.${color}`))?.join(' - ')}
              </div>
            )*/}

            {item?.commentary && (
              <div style={{ marginTop: '20px' }}>
                <span>{item?.commentary}</span>
              </div>
            )}
            {item?.reference && (
              <div style={{ marginTop: '20px' }}>
                <span>Référence: {item?.reference}</span>
              </div>
            )}
          </Infos>

          <div style={{ marginTop: '40px' }}>
            <p>{item?.description}</p>
            <a
              href={`https://api.whatsapp.com/send?phone=33781530898&text=Hello Hyro, Je voudrais plus d'informations sur la location de cet article: ${
                item.title
              } (ref: ${item.reference}). URL: ${process.env.url?.trim()}${router.asPath?.trim()}`}
              target={'_blank'}
              rel="noreferrer"
            >
              <Button>
                Louer maintenant <img src={'/whatsapp.png'} alt={'whatsapp'} />
              </Button>
            </a>
          </div>
        </MainRight>
        <MainLeftMobile>
          {related?.length > 0 && (
            <div style={{ marginTop: '40px' }}>
              <h2 style={{ textAlign: 'center' }}>Vous aimerez aussi</h2>

              <OthersPictures big>
                {related.map((relatedItem) => (
                  <Link href={`/items/${relatedItem._id}`} passHref key={relatedItem._id}>
                    <div>
                      <img src={relatedItem?.picture} alt={relatedItem?.picture} />
                    </div>
                  </Link>
                ))}
              </OthersPictures>
            </div>
          )}
        </MainLeftMobile>
      </Main>
      <OnlyDesktop>
        {related?.length > 0 && (
          <div style={{ marginTop: '40px' }}>
            <h2>Vous aimerez aussi</h2>

            <OthersPictures big>
              {related.map((relatedItem) => (
                <Link href={`/items/${relatedItem._id}`} passHref key={relatedItem._id}>
                  <a rel="noopener noreferrer">
                    <div>
                      <img src={relatedItem?.picture} alt={relatedItem?.picture} />
                    </div>
                  </a>
                </Link>
              ))}
            </OthersPictures>
          </div>
        )}
      </OnlyDesktop>
    </LayoutWithHeader>
  );
};

export default PageItem;
