import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { sizesOutfitsType, sizesShoesType } from 'lib-enums';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { deviceMedia, deviceSizes } from '../../../styles/helper';
import Item from './Item/Item';
import theme from '../../../styles/theme';
import { translation } from '../../../../../../libs/translations';
import Dropdown from '../../Dropdown/Dropdown';
import Pagination from '../../Pagination/Pagination';
import LayoutWithHeader from '../../../layouts/LayoutWithHeader/LayoutWithHeader';
import Size from '../../Size';
import { Button } from '../../Buttons/Buttons';
import ModalMobileFilters from './ModalMobileFilters/ModalMobileFilters';
import Spinner from '../../Spinner/Spinner';

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
  padding: 0 20px;

  ${deviceMedia[deviceSizes.phone]`
    display: none;
  `};
`;

const MobileFiltersContainer = styled.div`
  display: none;

  ${deviceMedia[deviceSizes.phone]`
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      padding-bottom: 20px;
  `};
`;

const MobileFilters = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
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
  margin-right: auto;
`;

const Pin = ({ content, onClose }) => {
  return (
    <StyledPin>
      {content} <img src={'/x.svg'} alt={'cross'} onClick={onClose} />
    </StyledPin>
  );
};

const SizesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const Search = styled.input`
  height: 50px;
  width: 300px;
  max-width: 100%;
  border: none;
  border-radius: 35px;
  padding: 10px 20px;
  outline: none;
  font-size: ${theme.font.medium};
  ${(props) => props.disabled && 'background: none'};
  background: transparent;

  ${deviceMedia[deviceSizes.phone]`
    max-width: 200px;
  `};
`;

const PageHome = ({
  hack = {},
  initialCategories = [],
  initialBrands = [],
  initialSizes = [],
  initialColors = [],
}) => {
  const router = useRouter();

  const items = useSelector((state) => state.items);

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [categories, setCategories] = useState(initialCategories);
  const [brands, setBrands] = useState(initialBrands);
  const [sizes, setSizes] = useState(initialSizes);
  const [colors, setColors] = useState(initialColors);

  const [page, setPage] = useState(0);
  const perPage = 12;
  const [itemsFiltered, setItemsFiltered] = useState([]);
  const [itemsRendered, setItemsRendered] = useState([]);
  const [itemsSearch, setItemsSearch] = useState([]);

  const [search, setSearch] = useState('');

  const isInCategories = (item) =>
    !categories?.length || item.categories?.find((c) => categories.includes(c));
  const isInBrands = (item) => !brands?.length || item.brands?.find((c) => brands.includes(c));
  const isInSizes = (item) => !sizes?.length || item.sizes?.find((c) => sizes.includes(c));
  const isInColors = (item) => !colors?.length || item.colors?.find((c) => colors.includes(c));

  const searchIsInTitle = (item, word) => item.title?.toLowerCase()?.includes(word?.toLowerCase());
  const searchIsInReference = (item, word) =>
    item.reference?.toLowerCase()?.includes(word?.toLowerCase());
  const searchIsInBrands = (item, word) =>
    item.brands
      ?.map((b) => b?.toLowerCase())
      ?.join(' ')
      ?.includes(word?.toLowerCase());
  const searchIsInCategory = (item, word) =>
    item.categories
      ?.map((b) => b?.toLowerCase())
      ?.join(' ')
      ?.includes(word?.toLowerCase());

  const reset = () => {
    setCategories(initialCategories);
    setBrands(initialBrands);
    setSizes(initialSizes);
    setColors(initialColors);
  };

  useMemo(() => {
    if (search) {
      const words = search.split(' ');

      setItemsSearch(
        items
          ?.filter((item) =>
            words?.some(
              (w) =>
                searchIsInReference(item, w) ||
                searchIsInBrands(item, w) ||
                searchIsInCategory(item, w) ||
                searchIsInTitle(item, w),
            ),
          )
          .slice(0, 20),
      );
    } else {
      setItemsSearch([]);
    }
  }, [search]);

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
        <MobileFiltersContainer>
          <div style={{ maxWidth: '200px' }}>
            <Dropdown
              toggle={
                <Search
                  placeholder={'Recherche...'}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              }
            >
              {itemsSearch?.map((itemSearched) => {
                return (
                  <Link href={`/items/${itemSearched._id}`} key={`searched_${itemSearched._id}`}>
                    <p>
                      {itemSearched.reference} - {itemSearched.title}
                    </p>
                  </Link>
                );
              })}
              {itemsSearch?.length < 1 && search?.length > 0 && <Spinner />}
            </Dropdown>
          </div>
          <MobileFilters onClick={() => setShowMobileFilters(true)}>
            <img
              src={'/filter.svg'}
              alt={'filters'}
              style={{ width: '20px', height: '20px', marginRight: '10px' }}
            />
            <span>Filtres</span>
            <div
              style={{
                color: 'black',
                backgroundColor: '#cacaca',
                borderRadius: '50%',
                fontSize: '10px',
                width: '16px',
                height: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '10px',
              }}
            >
              <span>{categories?.length + brands?.length + sizes?.length + colors?.length}</span>
            </div>
          </MobileFilters>
        </MobileFiltersContainer>
        <Filters>
          <Filter>
            <Dropdown
              toggle={
                <Search
                  placeholder={'Recherche...'}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              }
            >
              {itemsSearch?.map((itemSearched) => {
                return (
                  <Link href={`/items/${itemSearched._id}`} key={`searched_${itemSearched._id}`}>
                    <p>
                      {itemSearched.reference} - {itemSearched.title}
                    </p>
                  </Link>
                );
              })}
              {itemsSearch?.length < 1 && search?.length > 0 && <Spinner />}
            </Dropdown>
          </Filter>
          <Filter>
            <Dropdown value={'Catégories'}>
              {hack?.categories
                ?.filter((c) => !categories?.includes(c))
                ?.sort()
                .map((category) => (
                  <p key={category} onClick={() => setCategories([...categories, category])}>
                    {category}
                  </p>
                ))}
            </Dropdown>
            <PinsContainer>
              {categories.map((category) => (
                <Pin
                  key={category}
                  content={category}
                  onClose={() => {
                    setCategories(categories?.filter((c) => c !== category));
                  }}
                />
              ))}
            </PinsContainer>
          </Filter>

          <Filter>
            <Dropdown value={'Marques'}>
              {hack?.brands
                ?.filter((c) => !brands?.includes(c))
                ?.sort()
                .map((brand) => (
                  <p
                    key={brand}
                    onClick={() => {
                      setBrands([...brands, brand]);
                    }}
                  >
                    {brand}
                  </p>
                ))}
            </Dropdown>
            <PinsContainer>
              {brands.map((brand) => (
                <Pin
                  key={brand}
                  content={brand}
                  onClose={() => {
                    setBrands(brands?.filter((c) => c !== brand));
                  }}
                />
              ))}
            </PinsContainer>
          </Filter>

          <Filter>
            <Dropdown value={'Couleurs'}>
              {hack?.colors
                ?.filter((c) => !colors?.includes(c))
                ?.sort()
                .map((color) => (
                  <p key={color} onClick={() => setColors([...colors, color])}>
                    {color}
                  </p>
                ))}
            </Dropdown>
            <PinsContainer>
              {colors.map((color) => (
                <Pin
                  key={color}
                  content={color}
                  onClose={() => setColors((ca) => ca.filter((c) => c !== color))}
                />
              ))}
            </PinsContainer>
          </Filter>

          <Filter>
            <p style={{ marginBottom: '0' }}>Tailles :</p>
            <SizesContainer>
              {Object.keys(sizesOutfitsType).map((size) => (
                <Size
                  key={size}
                  onClick={() => {
                    setSizes(
                      sizes?.find((s) => s === size)
                        ? sizes?.filter((s) => s !== size)
                        : [...sizes, size],
                    );
                  }}
                  selected={sizes?.find((s) => s === size)}
                >
                  {translation(`sizes.${size}`)}
                </Size>
              ))}
            </SizesContainer>
          </Filter>

          <Filter>
            <p style={{ marginBottom: '0' }}>Pointures :</p>
            <SizesContainer>
              {Object.keys(sizesShoesType).map((size) => (
                <Size
                  key={size}
                  onClick={() =>
                    setSizes(
                      sizes?.find((s) => s === size)
                        ? sizes?.filter((s) => s !== size)
                        : [...sizes, size],
                    )
                  }
                  selected={sizes?.find((s) => s === size)}
                >
                  {translation(`sizes.${size}`)}
                </Size>
              ))}
            </SizesContainer>
          </Filter>

          <Button
            color={'black'}
            bgColor={'white'}
            style={{ marginRight: 'auto', marginBottom: '30px' }}
            small
            onClick={() => {
              reset();
              router.replace('/');
            }}
          >
            Effacer les filtres
          </Button>
        </Filters>

        <ItemsContent>
          <ItemsContainer>
            {itemsRendered
              ?.sort((a, b) => a.place - b.place)
              ?.map((item) => (
                <Item item={item} key={item?._id} />
              ))}
            <Pagination
              currentPage={page}
              totalPages={itemsFiltered?.length / perPage}
              onPageChange={(p) => {
                setPage(p);
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }}
            />
          </ItemsContainer>
        </ItemsContent>
      </ContentContainer>

      {showMobileFilters && (
        <ModalMobileFilters
          hack={hack}
          categories={categories}
          setCategories={setCategories}
          brands={brands}
          setBrands={setBrands}
          sizes={sizes}
          setSizes={setSizes}
          colors={colors}
          setColors={setColors}
          reset={reset}
          handleClose={() => setShowMobileFilters(false)}
        />
      )}
    </LayoutWithHeader>
  );
};

export default PageHome;
