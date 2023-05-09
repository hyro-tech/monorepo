import httpStatus from 'http-status';
import WooCommerce from 'woocommerce-api';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

import { S3Service } from './src/services';
import { ItemsRepository } from './src/repositories';

export async function uploadPicture(documentKey, path) {
  try {
    const response = await fetch(path);
    if (response) {
      const buffer = await response.buffer();

      if (response.status === httpStatus.OK) {
        await S3Service.S3Upload(
          {
            buffer,
          },
          documentKey,
        );

        return S3Service.S3GetPath(documentKey);
      }
    } else {
      return null;
    }
  } catch (err) {
    console.log('Error while sending picture to the bucket', err);
    return null;
  }
}

function getProductsFromWooCommerce(api, page) {
  return new Promise((resolve, reject) => {
    api.get(`products?page=${page}&per_page=${100}`, function (err, data) {
      if (err) {
        reject();
      } else {
        resolve(JSON.parse(data.body));
      }
    });
  });
}

const categoriesMapper = {
  'Ensemble &amp; Costume': 'set_suit',
  'Manteau &amp; Blouson': 'coat_jacket',
  Sweatshirt: 'sweatshirt',
  Chemise: 'shirt',
  Sneakers: 'sneakers',
  Pantalon: 'pants',
  'Chapeau &amp; Casquette': 'accessories',
  'Tee-Shirt &amp; Polo': 'tee_shirt_polo',
};

const brandsMapper = {
  'Louis Vuitton': 'louis_vuitton',
  Celine: 'celine',
  Dior: 'dior',
  'Nike &amp; Jordan': 'nike_jordan',
  Lanvin: 'lanvin',
  Marni: 'marni',
  Gucci: 'gucci',
  Amiri: 'amiri',
  'Chrome Hearts': 'chrome_hearts',
  Chanel: 'chanel',
  Prada: 'prada',
  Other: 'other',
  'Ami Paris': 'ami_paris',
  Balenciaga: 'balenciaga',
  'Off White': 'off_white',
  Givenchy: 'givenchy',
  Fendi: 'fendi',
  'Saint Laurent': 'yves_saint_laurent',
  Moncler: 'moncler',
  Designer: 'designer',
  Burberry: 'burberry',
  'Palm Angels': 'palm_angels',
  'Gallery Dept.': 'gallery_dept',
  Courrèges: 'courreges',
  Versace: 'versace',
};

const sizesMapper = {
  S: 's',
  M: 'm',
  L: 'l',
  XL: 'xl',
  XXL: 'xxl',
  41: '41',
  42: '42',
  43: '43',
  44: '44',
  45: '45',
  46: '46',
};

export async function fillNewbase() {
  try {
    const WooCommerceApi = new WooCommerce({
      url: 'https://www.hyroparis.com/',
      consumerKey: 'ck_2d9c775cd21e52129d64b6f63397cd3fa0b406e1',
      consumerSecret: 'cs_0199641c04f7605c8552c7d8f0a50ba673cd10f4',
      wpAPI: true,
      version: 'wc/v1',
    });
    console.log('WooCommerceApi Connected');

    const iter = [1, 2, 3, 4, 5, 6, 7];
    let articles = [];
    for await (const i of iter) {
      const ret = await getProductsFromWooCommerce(WooCommerceApi, i);
      if (ret.length) articles = articles.concat(ret);
    }

    for await (const article of articles) {
      const item = await ItemsRepository.createItem({
        title: article.name,
        brands: (article.tags || []).map((brand) => brandsMapper[brand.name]),
        categories: (article.categories || []).map((category) => categoriesMapper[category.name]),
        sizes: article.attributes
          ? ((article.attributes[0] || {}).options || []).map((size) => sizesMapper[size])
          : [],
        colors: [],
        price: parseInt(article.price, 10),
        rental_price: 0,
        images: [],
        available: true,
      });

      const pictures = [];
      for await (const image of article.images) {
        const id = await uuidv4();
        pictures.push({
          name: id,
          path: `items/${item._id}/picture/${id}`,
          src: image.src,
        });
      }

      await ItemsRepository.updateById(item._id, {
        images: pictures.map((pic) => ({
          name: pic.name,
          path: pic.path,
        })),
      });

      await Promise.all(pictures.map((pic) => uploadPicture(pic.path, pic.src)));
    }

    console.log('fill-new-base done');
  } catch (err) {
    console.log(err);
  }
}
