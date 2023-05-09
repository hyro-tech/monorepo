import callApi, { CALL_API } from './callApi';

export default function middlewareApi() {
  return (next) => async (_action) => {
    if (!_action) return null;

    const action = await _action;
    if (!action) return null;

    const callAPI = action[CALL_API];
    if (typeof callAPI === 'undefined') {
      return next(action);
    }

    const { types, options } = callAPI;

    if (typeof options.url !== 'string') {
      throw new Error('Specify a string endpoint URL.');
    }
    if (!Array.isArray(types) || types.length !== 3) {
      throw new Error('Expected an array of three action types.');
    }
    if (!types.every((type) => typeof type === 'string')) {
      throw new Error('Expected action types to be strings.');
    }

    const actionWith = (data) => {
      const finalAction = { ...action, ...data };
      delete finalAction[CALL_API];
      return finalAction;
    };
    const [requestType, successType, failureType] = types;

    next(actionWith({ type: requestType }));

    return callApi(options).then(
      (response) =>
        next(
          actionWith({
            response,
            type: successType,
          }),
        ),
      (error) =>
        next(
          actionWith({
            type: failureType,
            error: error.message || 'Something bad happened',
            response: (error.response || {}).data,
          }),
        ),
    );
  };
}
