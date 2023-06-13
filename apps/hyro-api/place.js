import { ItemsRepository } from './src/repositories';

export async function placeScript() {
  try {
    const items = await ItemsRepository.getFiltered();

    let i = 1;

    for await (const item of items) {
      await ItemsRepository.updateById(item._id, {
        $set: {
          place: i,
        },
      });

      i += 1;
    }

    console.log('place script done');
  } catch (err) {
    console.log(err);
  }
}
