/* eslint-disable */
const mongodb = require('./mongodb');

class dbStore {
  async load(fn) {
    try {
      await mongodb.connect();

      const conn = mongodb.getConnect();

      const data = await conn.collection('migrations').findOne();

      await mongodb.disconnect();

      return data ? fn(null, data) : fn(null, {});
    } catch (err) {
      return fn(err);
    }
  }

  async save(set, fn) {
    try {
      await mongodb.connect();

      const conn = mongodb.getConnect();

      const result = await conn.collection('migrations').updateMany(
        {},
        {
          $set: { lastRun: set.lastRun },
          $push: { migrations: { $each: set.migrations } },
        },
        { upsert: true, multi: true },
      );

      await mongodb.disconnect();

      return fn(null, result);
    } catch (err) {
      return fn(err);
    }
  }
}

module.exports = dbStore;
