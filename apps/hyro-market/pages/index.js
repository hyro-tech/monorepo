import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import PageHome from '../src/components/Pages/PageHome/PageHome';
import { getItemsFiltered } from '../src/actions/items';
import { getHack } from '../src/actions/hack';

const Home = ({ categories, brands, sizes, colors, page }) => {
  const dispatch = useDispatch();

  const [hack, setHack] = useState(null);

  useEffect(() => {
    getHack().then(setHack);
    dispatch(getItemsFiltered({}, 1));
  }, []);

  return (
    <PageHome
      hack={hack}
      categories={categories}
      brands={brands}
      sizes={sizes}
      colors={colors}
      page={page}
    />
  );
};

export async function getServerSideProps({ query }) {
  return {
    props: {
      categories: query.categories?.split(',') || [],
      brands: query.brands?.split(',') || [],
      sizes: query.sizes?.split(',') || [],
      colors: query.colors?.split(',') || [],
      page: query.page || 0,
    },
  };
}

export default Home;
