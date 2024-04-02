import express from 'express';
import dotenv from 'dotenv';
import serviceExpress from './services/express';
import * as db from './services/mongodb';
import configs from './configs';

require('esm');

const app = express();
dotenv.config();
serviceExpress(app);

let retry = 1;
async function start() {
  try {
    console.log('Establishing connexion with database...');
    await db.connect(configs.services.mongodb.uri);

    console.log(`Welcome on app, port: ${configs.port}`);
  } catch (err) {
    console.log(err);

    if (retry >= 3) {
      console.log('Max retry');
      process.exit(1);
    } else {
      console.log('Retry ...');
      setTimeout(start, 3000);
      retry += 1;
    }
  }
}

process.on('uncaughtException', (err) => {
  console.debug('Uncaught exception');
  console.error(err);
});

app.listen(configs.port, start);
