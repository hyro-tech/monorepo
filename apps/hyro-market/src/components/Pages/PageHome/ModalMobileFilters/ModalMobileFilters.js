import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import { sizesType } from 'lib-enums';

import { Button } from '../../../Buttons/Buttons';
import theme from '../../../../styles/theme';
import { translation } from '../../../../../../../libs/translations';

const TakeAllModal = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  background-color: #edeeee;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 20px;
  background-color: white;
  margin-bottom: 20px;

  h4 {
    font-size: 16px;
    margin: 0;
  }

  span {
    font-size: 14px;
    font-weight: 200;
  }
`;

const Content = styled.div`
  padding-bottom: 100px;

  h6 {
    margin-bottom: 10px;
  }
`;

const Category = styled.div`
  position: relative;
  background-color: white;
  padding: 20px;
  border: 1px solid ${(props) => (props.isSelected ? '#008826' : '#cacaca')};
  border-top: ${(props) => !props.isFirst && !props.isSelected && 'none'};

  img {
    position: absolute;
    width: 14px;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }

  p {
    font-size: 16px;
    line-height: 16px;
    margin: 0;
  }

  span {
    font-size: 12px;
    font-weight: 300;
    color: ${theme.colors.gray};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;

const ModalMobileFilters = ({
  hack,
  categories,
  setCategories,
  brands,
  setBrands,
  sizes,
  setSizes,
  colors,
  setColors,
  reset,
  handleClose,
}) => {
  const [filter, setFilter] = useState(0);

  return (
    <Modal show>
      <TakeAllModal>
        <Content>
          <Header>
            {!filter && <h4>FILTRER</h4>}
            {filter > 0 && (
              <div style={{ display: 'flex', alignItems: 'center' }} onClick={() => setFilter(0)}>
                <img
                  src={'/arrow.svg'}
                  alt={'back'}
                  style={{
                    width: '20px',
                    height: '20px',
                    transform: 'rotate(-90deg)',
                    marginRight: '10px',
                  }}
                />
                <h4>Retour</h4>
              </div>
            )}
            {!filter && <span onClick={reset}>TOUT REINITIALISER</span>}
          </Header>
          {!filter && (
            <div>
              <Category isFirst onClick={() => setFilter(1)}>
                <p>Catégories</p>
                <span>{categories?.join(', ')}</span>
              </Category>
              <Category onClick={() => setFilter(2)}>
                <p>Marques</p>
                <span>{brands?.join(', ')}</span>
              </Category>
              <Category onClick={() => setFilter(3)}>
                <p>Couleurs</p>
                <span>{colors?.join(', ')}</span>
              </Category>
              <Category onClick={() => setFilter(4)}>
                <p>Tailles</p>
                <span>{sizes?.map((c) => translation(`sizes.${c}`))?.join(', ')}</span>
              </Category>
            </div>
          )}

          {filter === 1 && (
            <div>
              {hack?.categories?.map((c, index) => (
                <Category
                  isFirst={!index}
                  key={`category_${c}`}
                  isSelected={categories?.find((x) => c === x)}
                  onClick={() => {
                    if (categories?.find((x) => c === x)) {
                      setCategories(categories?.filter((x) => c !== x));
                    } else {
                      setCategories([...categories, c]);
                    }
                  }}
                >
                  <p>{c}</p>
                  {categories?.find((x) => c === x) && (
                    <img src={'/check_green.svg'} alt={'check'} style={{ width: '14px' }} />
                  )}
                </Category>
              ))}
            </div>
          )}

          {filter === 2 && (
            <div>
              {hack?.brands?.map((c, index) => (
                <Category
                  isFirst={!index}
                  key={`brand${c}`}
                  isSelected={brands?.find((x) => c === x)}
                  onClick={() => {
                    if (brands?.find((x) => c === x)) {
                      setBrands(brands?.filter((x) => c !== x));
                    } else {
                      setBrands([...brands, c]);
                    }
                  }}
                >
                  <p>{c}</p>
                  {brands?.find((x) => c === x) && (
                    <img src={'/check_green.svg'} alt={'check'} style={{ width: '14px' }} />
                  )}
                </Category>
              ))}
            </div>
          )}

          {filter === 3 && (
            <div>
              {hack?.colors?.map((c, index) => (
                <Category
                  isFirst={!index}
                  key={`colors${c}x`}
                  isSelected={colors?.find((x) => c === x)}
                  onClick={() => {
                    if (colors?.find((x) => c === x)) {
                      setColors(colors?.filter((x) => c !== x));
                    } else {
                      setColors([...colors, c]);
                    }
                  }}
                >
                  <p>{c}</p>
                  {colors?.find((x) => c === x) && (
                    <img src={'/check_green.svg'} alt={'check'} style={{ width: '14px' }} />
                  )}
                </Category>
              ))}
            </div>
          )}

          {filter === 4 && (
            <div>
              {Object.keys(sizesType)?.map((c, index) => (
                <Category
                  isFirst={!index}
                  key={`sizes${c}`}
                  isSelected={sizes?.find((x) => c === x)}
                  onClick={() => {
                    if (sizes?.find((x) => c === x)) {
                      setSizes(sizes?.filter((x) => c !== x));
                    } else {
                      setSizes([...sizes, c]);
                    }
                  }}
                >
                  <p>{translation(`sizes.${c}`)}</p>
                  {sizes?.find((x) => c === x) && (
                    <img src={'/check_green.svg'} alt={'check'} style={{ width: '14px' }} />
                  )}
                </Category>
              ))}
            </div>
          )}

          <Button
            onClick={handleClose}
            style={{
              width: '80%',
              position: 'fixed',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            Voir les articles
          </Button>
        </Content>
      </TakeAllModal>
    </Modal>
  );
};

export default ModalMobileFilters;
