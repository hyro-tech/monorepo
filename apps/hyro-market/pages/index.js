import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import PageHome from '../src/components/Pages/PageHome/PageHome';
import { GET_ITEMS_SUCCESS, getItemsFiltered } from '../src/actions/items';
import { getHack } from '../src/actions/hack';

const Home = ({ page, categories, brands, sizes, colors }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const [hack, setHack] = useState(null);

  useEffect(() => {
    getHack().then(setHack);

    const getItems = async () => {
      try {
        const response = await getItemsFiltered({ categories, brands, sizes, colors }, page);

        if (response.type == GET_ITEMS_SUCCESS) {
          dispatch(response);
          setIsLoading(false);
        }

        setIsLoading(false);
      } catch (error) {
        console.log({ error });
        setIsLoading(false);
        setError('Erreur interne du serveur');
      }
    };

    getItems();
  }, [page, categories, brands, sizes, colors]);

  return (
    <PageHome
      page={page}
      hack={hack}
      categories={categories}
      brands={brands}
      sizes={sizes}
      colors={colors}
      isLoading={isLoading}
      error={error}
    />
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
