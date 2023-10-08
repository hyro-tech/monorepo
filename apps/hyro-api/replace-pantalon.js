import { ItemsRepository } from './src/repositories';

export async function replacePantalonScript() {
  try {
    const items = await ItemsRepository.get({ categories: 'Pantalon' });

    for await (const item of items) {
      const newCategories = item.categories.map((category) =>
        category === 'Pantalon' ? 'Pantalon & Shorts' : category,
      );

      await ItemsRepository.updateById(item._id, {
        $set: {
          categories: newCategories,
        },
      });
    }

    console.log('replace Pantalon script done');
  } catch (err) {
    console.log(err);
  }
}
