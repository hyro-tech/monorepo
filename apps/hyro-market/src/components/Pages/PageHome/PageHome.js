import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { brandsType, categoriesType, colorsType, sizesType } from 'lib-enums';

import { deviceMedia, deviceSizes } from '../../../styles/helper';
import Item from './Item/Item';
import theme from '../../../styles/theme';
import { translation } from '../../../../../../libs/translations';
import Dropdown from '../../Dropdown/Dropdown';
import Pagination from '../../Pagination/Pagination';
import LayoutWithHeader from '../../../layouts/LayoutWithHeader/LayoutWithHeader';

const ContentContainer = styled.div`
  display: flex;
  column-gap: 30px;
  padding: 20px 20px 60px 20px;
  margin-top: 40px;

  h6 {
    margin-bottom: 20px;
  }

  ${deviceMedia[deviceSizes.phone]`
    max-width: 100%;
    margin: 0;
    flex-direction: column;
    align-items: center;
  `};
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 950px;

  ${deviceMedia[deviceSizes.phone]`
    align-items: center;
    justify-content: center;
  `};
`;

const PinsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const StyledPin = styled.div`
  width: fit-content;
  background-color: ${theme.colors.graySoft};
  border-radius: 35px;
  padding: 10px 25px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  column-gap: 10px;

  img {
    height: 9px;
    cursor: pointer;
  }
`;

const Filters = styled.div`
  width: 25%;
  min-width: 300px;

  ${deviceMedia[deviceSizes.phone]`
    width: 300px;
  `};
`;

const Filter = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  margin-bottom: 50px;
`;

const ItemsContent = styled.div`
  display: flex;
  flex-direction: column;
  column-gap: 10px;
`;

const Pin = ({ content, onClose }) => {
  return (
    <StyledPin>
      {content} <img src={'/x.svg'} alt={'cross'} onClick={onClose} />
    </StyledPin>
  );
};

const PageHome = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  const items = useSelector((state) => state.items);

  const [page, setPage] = useState(0);
  const perPage = 9;
  const [itemsFiltered, setItemsFiltered] = useState([]);
  const [itemsRendered, setItemsRendered] = useState([]);

  const isInCategories = (item) =>
    !categories?.length || item.categories?.find((c) => categories.includes(c));
  const isInBrands = (item) => !brands?.length || item.brands?.find((c) => brands.includes(c));
  const isInSizes = (item) => !sizes?.length || item.sizes?.find((c) => sizes.includes(c));
  const isInColors = (item) => !colors?.length || item.colors?.find((c) => colors.includes(c));

  useMemo(() => {
    if (items) {
      setItemsFiltered(items);
    }
  }, [items]);

  useMemo(() => {
    if (items) {
      setItemsFiltered(
        [...items].filter(
          (item) => isInCategories(item) && isInBrands(item) && isInSizes(item) && isInColors(item),
        ),
      );
    }

    setPage(0);
  }, [categories, brands, sizes, colors]);

  useMemo(() => {
    setItemsRendered([...itemsFiltered].slice(page * perPage, page * perPage + perPage));
  }, [page, itemsFiltered]);

  return (
    <LayoutWithHeader>
      <ContentContainer>
        <Filters>
          <Filter>
            <Dropdown value={'Catégories'}>
              {Object.keys(categoriesType)
                .filter((c) => !categories?.includes(c))
                .map((category) => (
                  <p key={category} onClick={() => setCategories([...categories, category])}>
                    {translation(`categories.${category}`)}
                  </p>
                ))}
            </Dropdown>
            <PinsContainer>
              {categories.map((category) => (
                <Pin
                  key={category}
                  content={translation(`categories.${category}`)}
                  onClose={() => setCategories((ca) => ca.filter((c) => c !== category))}
                />
              ))}
            </PinsContainer>
          </Filter>

          <Filter>
            <Dropdown value={'Marques'}>
              {Object.keys(brandsType)
                .filter((c) => !brands?.includes(c))
                .map((brand) => (
                  <p key={brand} onClick={() => setBrands([...brands, brand])}>
                    {translation(`brands.${brand}`)}
                  </p>
                ))}
            </Dropdown>
            <PinsContainer>
              {brands.map((brand) => (
                <Pin
                  key={brand}
                  content={translation(`brands.${brand}`)}
                  onClose={() => setBrands((ca) => ca.filter((c) => c !== brand))}
                />
              ))}
            </PinsContainer>
          </Filter>

          <Filter>
            <Dropdown value={'Tailles'}>
              {Object.keys(sizesType)
                .filter((c) => !sizes?.includes(c))
                .map((size) => (
                  <p key={size} onClick={() => setSizes([...sizes, size])}>
                    {translation(`sizes.${size}`)}
                  </p>
                ))}
            </Dropdown>
            <PinsContainer>
              {sizes.map((size) => (
                <Pin
                  key={size}
                  content={translation(`sizes.${size}`)}
                  onClose={() => setSizes((ca) => ca.filter((c) => c !== size))}
                />
              ))}
            </PinsContainer>
          </Filter>

          <Filter>
            <Dropdown value={'Couleurs'}>
              {Object.keys(colorsType)
                .filter((c) => !colors?.includes(c))
                .map((color) => (
                  <p key={color} onClick={() => setColors([...colors, color])}>
                    {translation(`colors.${color}`)}
                  </p>
                ))}
            </Dropdown>
            <PinsContainer>
              {colors.map((color) => (
                <Pin
                  key={color}
                  content={translation(`colors.${color}`)}
                  onClose={() => setColors((ca) => ca.filter((c) => c !== color))}
                />
              ))}
            </PinsContainer>
          </Filter>
        </Filters>

        <ItemsContent>
          <ItemsContainer>
            {itemsRendered?.map((item) => (
              <Item item={item} key={item?._id} />
            ))}
            <Pagination
              currentPage={page}
              totalPages={itemsFiltered?.length / perPage}
              onPageChange={setPage}
            />
          </ItemsContainer>
        </ItemsContent>
      </ContentContainer>
    </LayoutWithHeader>
  );
};

export default PageHome;
