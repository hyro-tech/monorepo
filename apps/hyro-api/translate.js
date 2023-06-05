import { ItemsRepository } from './src/repositories';
import { translation } from '../../libs/translations';

export async function translate() {
  try {
    const items = await ItemsRepository.getFiltered();

    for await (const item of items) {
      const brands = item.brands.map((x) => translation(`brands.${x}`));
      const categories = item.categories.map((x) => translation(`categories.${x}`));
      const colors = item.colors.map((x) => translation(`colors.${x}`));
      await ItemsRepository.updateById(item._id, { brands, categories, colors });
    }

    console.log('translate done');
  } catch (err) {
    console.log(err);
  }
}
