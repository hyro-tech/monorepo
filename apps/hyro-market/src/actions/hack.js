import callApi from '../middlewares/callApi';

export async function getHack() {
  try {
    const hack = await callApi({
      method: 'GET',
      url: `/hack`,
    });

    return hack;
  } catch (err) {
    return null;
  }
}
