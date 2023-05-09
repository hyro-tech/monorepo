import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import PageHome from '../src/components/Pages/PageHome/PageHome';
import { getItemsFiltered } from '../src/actions/items';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItemsFiltered({}, 1));
  }, []);

  return <PageHome />;
};

export default Home;
