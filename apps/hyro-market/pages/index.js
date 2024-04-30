import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import PageHome from '../src/components/Pages/PageHome/PageHome';
import { getItemsFiltered } from '../src/actions/items';
import { getHack } from '../src/actions/hack';

const Home = ({ page, categories, brands, sizes, colors }) => {
  const dispatch = useDispatch();

  const [hack, setHack] = useState(null);

  useEffect(() => {
    getHack().then(setHack);
    dispatch(getItemsFiltered({}, page));
  }, [page]);

  return (
    <PageHome page={page} hack={hack} categories={categories} brands={brands} sizes={sizes} colors={colors} />
  );
};

export async function getServerSideProps({ query }) {
  return {
    props: {
      page: query.page || 1,
      categories: query.categories?.split(',') || [],
      brands: query.brands?.split(',') || [],
      sizes: query.sizes?.split(',') || [],
      colors: query.colors?.split(',') || [],
    },
  };
}

export default Home;
