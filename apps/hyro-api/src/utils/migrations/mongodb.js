/* eslint-disable */
const mongoose = require('mongoose');

async function connect(uri) {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

function getConnect() {
  return mongoose.connection;
}

async function disconnect() {
  await mongoose.disconnect();
}

module.exports = {
  connect,
  getConnect,
  disconnect,
};
