import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { useDebounce } from '../../../hooks/useDebounce';
import { GET_ITEMS_SUCCESS, getItemsByQuery } from '../../../actions/items';

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
  page = 1,
  hack = {},
  categories = [],
  brands = [],
  sizes = [],
  colors = [],
  isLoading,
  error,
}) => {
  const router = useRouter();
  const { data: items, maxPage } = useSelector((state) => state.items);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(true);
  // console.log(items);

  const [itemsSearch, setItemsSearch] = useState([]);

  const [search, setSearch] = useState('');
  const searchQuery = useDebounce(search, 500);

  const setFilter = (key, value) => {
    const newQuery = { ...router.query };

    if (value.length === 0) {
      delete newQuery[key];
      router.replace({ query: newQuery });
      return;
    }

    newQuery[key] = value;
    newQuery.page = 1;
    router.replace({ query: newQuery });
  };

  const setCategories = (categories) => setFilter('categories', categories.join(','));
  const setBrands = (brands) => setFilter('brands', brands.join(','));
  const setSizes = (sizes) => setFilter('sizes', sizes.join(','));
  const setColors = (colors) => setFilter('colors', colors.join(','));

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
    setCategories([]);
    setBrands([]);
    setSizes([]);
    setColors([]);
  };

  const handleChangeCategories = (category) => {
    setCategories([...categories, category]);
  };

  const handleChangeBrand = (brand) => {
    setBrands([...brands, brand]);
  };

  const handleChangeColor = (color) => {
    setColors([...colors, color]);
  };

  const handleChangeSize = (size) => {
    if (sizes.includes(size)) {
      handleRemoveSizes(size);
      return;
    }

    setSizes([...sizes, size]);
  };

  const removeQueryParam = (paramToRemove) => {
    const { pathname, query } = router;
    const { [paramToRemove]: _, ...rest } = query;
    router.push({
      pathname,
      query: rest,
    });
  };

  const handleRemoveCategories = (category) => {
    const updateCategories = categories?.filter((c) => c !== category);
    setCategories(updateCategories);
    if (updateCategories.length == 0) {
      removeQueryParam('categories');
      return;
    }

    router.query.categories = updateCategories.join(',');
    router.push(router);
  };

  const handleRemoveBrands = (brand) => {
    const updateBrands = brands?.filter((c) => c !== brand);
    setBrands(updateBrands);
    if (updateBrands.length == 0) {
      removeQueryParam('brands');
      return;
    }

    router.query.brands = updateBrands.join(',');
    router.push(router);
  };

  const handleRemoveColors = (color) => {
    const updateColors = colors?.filter((c) => c !== color);
    setColors(updateColors);
    if (updateColors.length == 0) {
      removeQueryParam('colors');
      return;
    }

    router.query.colors = updateColors.join(',');
    router.push(router);
  };

  const handleRemoveSizes = (size) => {
    const updateSizes = sizes?.filter((c) => c !== size);
    setSizes(updateSizes);
    if (updateSizes.length == 0) {
      removeQueryParam('sizes');
      return;
    }

    router.query.sizes = updateSizes.join(',');
    router.push(router);
  };

  useEffect(() => {
    if (searchQuery) {
      const fetchingItemsByQuery = async () => {
        setIsLoadingSearch(true);

        try {
          const response = await getItemsByQuery(searchQuery);

          if (response.type == GET_ITEMS_SUCCESS) {
            setIsLoadingSearch(false);

            if (response.length <= 0) {
              setItemsSearch([]);
              return;
            }
            setItemsSearch(response.response || []);
            return;
          }

          setItemsSearch([]);
          setIsLoadingSearch(false);
        } catch (error) {
          setItemsSearch([]);
          setIsLoadingSearch(false);
        }
      };

      fetchingItemsByQuery();
    } else {
      setItemsSearch([]);
      setIsLoadingSearch(false);
    }
  }, [searchQuery]);

  function handlePageChange(page) {
    router.replace({
      query: { ...router.query, page: page + 1 },
    });
  }

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

              {isLoadingSearch && (
                <>
                  <Spinner />
                </>
              )}

              {!isLoadingSearch && itemsSearch.length <= 0 && <>Aucun résultat</>}
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
              {isLoadingSearch && (
                <>
                  <Spinner />
                </>
              )}

              {!isLoadingSearch && itemsSearch.length <= 0 && searchQuery && (
                <div style={{ padding: '0.5rem' }}>Aucun résultat</div>
              )}
              {/* {itemsSearch?.length < 1 && search?.length > 0 && <Spinner />} */}
            </Dropdown>
          </Filter>
          <Filter>
            <Dropdown value={'Catégories'}>
              {hack?.categories
                ?.filter((c) => !categories?.includes(c))
                ?.sort()
                .map((category) => (
                  <p key={category} onClick={() => handleChangeCategories(category)}>
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
                    handleRemoveCategories(category);
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
                  <p key={brand} onClick={() => handleChangeBrand(brand)}>
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
                    handleRemoveBrands(brand);
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
                  <p key={color} onClick={() => handleChangeColor(color)}>
                    {color}
                  </p>
                ))}
            </Dropdown>
            <PinsContainer>
              {colors.map((color) => (
                <Pin
                  key={color}
                  content={color}
                  onClose={() => {
                    handleRemoveColors(color);
                  }}
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
                  onClick={() => handleChangeSize(size)}
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
                  onClick={() => handleChangeSize(size)}
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
            {items?.length > 0 && (
              <>
                {items
                  ?.sort((a, b) => a.place - b.place)
                  ?.map((item) => (
                    <Item item={item} key={item?._id} />
                  ))}

                <Pagination
                  currentPage={page - 1}
                  totalPages={maxPage}
                  onPageChange={handlePageChange}
                />
              </>
            )}

            {isLoading && (
              <>
                <Spinner />
              </>
            )}

            {items?.length == 0 && !isLoading && (
              <div
                style={{
                  padding: `1rem`,
                }}
              >
                {error && <>{error}</>}

                {!error && <>Aucun résultat</>}
              </div>
            )}
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
