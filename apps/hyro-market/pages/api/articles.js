import WooCommerce from 'woocommerce-api';

export default function handler(req, res) {
  const WooCommerceApi = new WooCommerce({
    url: 'https://www.hyroparis.com/',
    consumerKey: 'ck_2d9c775cd21e52129d64b6f63397cd3fa0b406e1',
    consumerSecret: 'cs_0199641c04f7605c8552c7d8f0a50ba673cd10f4',
    wpAPI: true,
    version: 'wc/v1',
  });

  WooCommerceApi.get(
    `products?page=${req.query.page || 4}&per_page=${req.query.per_page || 10}`,
    function (err, data) {
      console.log(err);
      res.status(200).json({ articles: JSON.parse(data.body) });
    },
  );
}
