import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import PageHome from '../src/components/Pages/PageHome/PageHome';
import { getItemsFiltered } from '../src/actions/items';
import { getHack } from '../src/actions/hack';

const Home = ({ categories, brands, sizes, colors }) => {
  const dispatch = useDispatch();

  const [hack, setHack] = useState(null);

  useEffect(() => {
    dispatch(getItemsFiltered({}, 1));

    getHack().then(setHack);
  }, []);

  return (
    <PageHome hack={hack} categories={categories} brands={brands} sizes={sizes} colors={colors} />
  );
};

export async function getServerSideProps({ query }) {
  return {
    props: {
      categories: query.categories?.split(',') || [],
      brands: query.brands?.split(',') || [],
      sizes: query.sizes?.split(',') || [],
      colors: query.colors?.split(',') || [],
    },
  };
}

export default Home;
