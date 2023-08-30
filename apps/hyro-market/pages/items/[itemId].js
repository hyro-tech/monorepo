import React from 'react';

import PageItem from '../../src/components/Pages/PageItem/PageItem';
import callApi from '../../src/middlewares/callApi';
import { getItemsRelated } from '../../src/actions/items';

const Item = ({ item, related }) => {
  return <PageItem item={item} related={related} />;
};

export async function getServerSideProps({ query }) {
  const item = await callApi({
    url: `/items/${query.itemId}`,
  });

  const related = await getItemsRelated(query.itemId);

  return {
    props: {
      item,
      related,
    },
  };
}

export default Item;
