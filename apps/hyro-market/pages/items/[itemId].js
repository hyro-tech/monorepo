import React from 'react';

import PageItem from '../../src/components/Pages/PageItem/PageItem';
import callApi from '../../src/middlewares/callApi';

const Item = ({ item }) => {
  return <PageItem item={item} />;
};

export async function getServerSideProps({ query }) {
  const item = await callApi({
    url: `/items/${query.itemId}`,
  });

  return {
    props: {
      item,
    },
  };
}

export default Item;
