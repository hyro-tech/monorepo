import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import PageHome from '../src/components/Pages/PageHome/PageHome';
import { getItemsFiltered } from '../src/actions/items';

const Home = ({ categories, brands, sizes, colors }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItemsFiltered({}, 1));
  }, []);

  return <PageHome categories={categories} brands={brands} sizes={sizes} colors={colors} />;
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
